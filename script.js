const navLinks = document.querySelectorAll('header nav a');
const logoLink = document.querySelector('.logo');
const sections = document.querySelectorAll('section');
const menuIcon = document.querySelector('#menu-icon');
const tabs = document.querySelector('.tabs');

menuIcon.addEventListener('click', () => {
    menuIcon.classList.toggle('bx-x');
    tabs.classList.toggle('active');
});
typeWriter();
