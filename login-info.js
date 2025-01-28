document.addEventListener('DOMContentLoaded', function () {
    let failedAttempts = 0;
    let isBlocked = false;
    let blockEndTime = 0;
    let isSubmitting = false;

    const form = document.getElementById('loginForm');
    form.setAttribute("autocomplete", "off");

    document.getElementById('loginForm').addEventListener('submit', function (e) {
        e.preventDefault();

        if (isBlocked) {
            const remainingTime = Math.ceil((blockEndTime - Date.now()) / 1000);
            playAudio('blockSound'); 
            showPopup(`You are temporarily blocked. Please try again in ${remainingTime} seconds.`, "error", true);
            return;
        }

        const username = sanitizeInput(document.getElementById('username').value);
        const password = sanitizeInput(document.getElementById('password').value);

        if (!validateInput(username, password)) {
            return;
        }

        if (isSubmitting) {
            return;
        }

        isSubmitting = true;

        const validUsers = [{
            username: "Omar_Maher991",
            password: "991621085OmArMa1her"
        }];

        const isValid = validUsers.some(user => user.username === username && user.password === password);

        const accessDeniedAudio = document.getElementById('accessDenied');
        const accessGrantedAudio = document.getElementById('accessGranted');

        if (isValid) {
            accessGrantedAudio.play();
            showPopup("Access granted", "success", false);

            setTimeout(function () {
                window.location.href = 'Admin-home.html';
            }, 3000);
        } else {
            failedAttempts++;
            accessDeniedAudio.play();

            if (failedAttempts >= 3) {
                isBlocked = true;
                blockEndTime = Date.now() + 60000;
                disableForm(true);

                showPopup("You are temporarily blocked due to multiple failed attempts. Please try again in 60 seconds.", "error", true);

                const interval = setInterval(function () {
                    const remainingTime = Math.ceil((blockEndTime - Date.now()) / 1000);
                    if (remainingTime <= 0) {
                        clearInterval(interval);
                        isBlocked = false;
                        failedAttempts = 0;
                        disableForm(false);
                        showPopup("You can now try logging in again.", "success", false);
                    } else {
                        showPopup(`You are temporarily blocked. Please try again in ${remainingTime} seconds.`, "error", true);
                    }
                }, 1000);
            } else {
                showPopup("Access Denied", "error", false);
            }
        }

        isSubmitting = false;
    });

    function sanitizeInput(input) {
        return input.replace(/[^a-zA-Z0-9_]/g, '');
    }

    function validateInput(username, password) {
        if (!username || !password) {
            showPopup("Error", "error", false);
            return false;
        }
        return true;
    }

    function showPopup(message, type, isBlocking) {
        const popup = document.getElementById('popup');
        popup.textContent = message;
        popup.className = `popup ${type === "error" ? "error-popup" : "success-popup"}`;
        popup.style.display = "block";

        if (!isBlocking) {
            setTimeout(function () {
                popup.style.display = "none";
            }, 2000);
        }
    }

    function disableForm(disable) {
        const formElements = document.getElementById('loginForm').elements;
        for (let i = 0; i < formElements.length; i++) {
            formElements[i].disabled = disable;
        }
    }
});