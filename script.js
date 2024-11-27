const hamburger = document.querySelector('.hamburger');
const tabs = document.querySelector('.tabs');
const closebtn = document.querySelector('.close-btn');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('bx-x');
    tabs.classList.toggle('active');
});

closebtn.addEventListener('click', () => {
    tabs.classList.toggle('active');
});

typeWriter();
