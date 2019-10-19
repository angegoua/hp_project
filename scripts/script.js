const callToAction = document.querySelector('.main__container__how-to__container-link')
const slider = document.querySelector('.games__slider')
const gamesTitle = document.querySelector('.games__title')
const leftArrow = document.querySelector('.left-arrow')
const rightArrow = document.querySelector('.right-arrow')
const fixPos = document.querySelectorAll('.toFix')
const informations = document.querySelector('#informations')
const questionTag = document.querySelector('.question-tag')
const modal = document.querySelector('.bg-modal')
const rightCube = document.querySelector('.right_cube')
const closeModal = document.querySelector('.bg-modal .close')


callToAction.addEventListener('click', function (e) {
    e.preventDefault()

    informations.classList.remove('isHidden')

    slider.style.display = 'none'
    leftArrow.style.display = 'none'
    rightArrow.style.display = 'none'

    gamesTitle.innerHTML = 'ENTREZ LE CODE INSCRIT<br> SUR VOTRE LEAFLET'
    gamesTitle.style.width = '100%'

    if (window.matchMedia("(min-width: 701px)").matches) {
        for (let i = 0; i < fixPos.length; i++) {

            fixPos[0].style.top = '30%'
            fixPos[1].style.top = '40%'
            fixPos[2].style.top = '70%'
        }
        rightCube.style.right = '25%'
    } 


    
})

questionTag.addEventListener('click', function () {
    modal.style.display = 'flex'
})

closeModal.addEventListener('click', function () {
    modal.style.display = 'none'
})