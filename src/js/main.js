const buttonClicksCounter = document.querySelector('#button-counter')
const clickedTimes = document.querySelector('#click-counter')

const closePopup = document.querySelector('#close-popup')
const popupBackground = document.querySelector('#popup-background')
const popupBox = document.querySelector('#popup-box')

const resetCounterButton = document.querySelector('#reset-counter')





function count(elemId){
    let clicked = localStorage.getItem(elemId)
    
    if(!clicked){
        localStorage.setItem(elemId, 1)
        clickedTimes.innerHTML = "1 time"
        return
    }
    
    clicked = Number(clicked) + 1
    localStorage.setItem(elemId, clicked)
    clickedTimes.innerHTML = `${clicked} times`
    
    if(clicked > 5){
        resetCounter(elemId)
    }
}

function resetCounter(elemId){   
    if(resetCounterButton.classList.contains('hide')){
        resetCounterButton.classList.toggle('hide')
    }
    resetCounterButton.onclick = () => {
        localStorage.removeItem(elemId)
        resetCounterButton.classList.toggle('hide')
    }
}

function hideResetButton(){
    if(!resetCounterButton.classList.contains('hide')){
        resetCounterButton.classList.toggle('hide')
    }
   
}





buttonClicksCounter.addEventListener('click', (e)=>{
    count(e.target.id)
    popupBackground.classList.toggle('hide')
})

closePopup.addEventListener('click', ()=>{
    hideResetButton()
    popupBackground.classList.toggle('hide')
})

popupBackground.addEventListener('click', (e)=>{
    if (popupBox.contains(e.target)) {
        return
    }
    hideResetButton()
    popupBackground.classList.toggle('hide')
    }
)
