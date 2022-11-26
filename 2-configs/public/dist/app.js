"use strict";
const button = document.querySelector('.clickeable');
const clickHandler = (text) => console.warn(text);
button === null || button === void 0 ? void 0 : button.addEventListener('click', () => clickHandler('Thank you for click me'));
