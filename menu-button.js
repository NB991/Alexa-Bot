function toggleMenu() {
    const menuBtn = document.querySelector('.menu-btn');
    const sidebar = document.querySelector('.sidebar');
    menuBtn.classList.toggle('active');
    sidebar.classList.toggle('active');
}

document.querySelector('.sidebar .close-btn').addEventListener('click', () => {
    document.querySelector('.menu-btn').classList.remove('active');
    document.querySelector('.sidebar').classList.remove('active');
});