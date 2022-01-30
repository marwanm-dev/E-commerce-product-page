// Variables
const body = document.body;
const navigation = document.querySelector('.navigation');
const cart = document.querySelector('.cart');
const basket = document.querySelector('.basket');
const menus = document.querySelectorAll('.menu');
const menuClose = document.querySelector('.menuClose');
const mqSize = '650px';
const mq = window.matchMedia(`(max-width: ${mqSize})`);

// Flags

// Functions
const checkMobile = () =>
  mq.matches ? body.classList.add('mobile__mode') : body.classList.remove('mobile__mode');

// EventListeners
cart.addEventListener('click', () => basket.classList.toggle('enable__basket'));
menus.forEach(menu =>
  menu.addEventListener('click', () => {
    body.classList.toggle('enable__sidebar');
    basket.classList.remove('enable__basket');
  })
);
window.addEventListener('resize', checkMobile);
window.addEventListener('DOMContentLoaded', checkMobile);
