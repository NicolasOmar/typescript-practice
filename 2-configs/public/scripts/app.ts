const button = document.querySelector('.clickeable')
const clickHandler = (text: string): void => console.warn(text)

button?.addEventListener('click', () => clickHandler('Thank you for click me'))