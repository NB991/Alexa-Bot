function copyKey(keyId) {
    const keyText = document.getElementById(keyId).textContent;


    const tempTextarea = document.createElement('textarea');
    tempTextarea.value = keyText;
    document.body.appendChild(tempTextarea);
    tempTextarea.select();
    document.execCommand('copy');
    document.body.removeChild(tempTextarea);

    alert('API key copied to clipboard!');
}