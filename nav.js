console.log("Anonymus")
const menu = document.querySelector('.lists')
const hamburger = document.querySelector('.hamburger')
hamburger.addEventListener('click', () => {
    menu.classList.toggle('active')
})