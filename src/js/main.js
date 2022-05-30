const buttonClicksCounter = document.querySelector('#button-counter')
const clickedTimes = document.querySelector('#click-counter')

const closePopup = document.querySelector('#close-popup')
const popupBackground = document.querySelector('#popup-background')
const popupBox = document.querySelector('#popup-box')

const resetCounterButton = document.querySelector('#reset-counter')

const tableHolder = document.querySelector('#table-holder')
const table = document.querySelector('tbody')
const loader = document.querySelector('#table-loader')





function count(elemId){
    let clicked = localStorage.getItem(elemId)
    
    if(!clicked){
        localStorage.setItem(elemId, 1)
        clickedTimes.innerText = "1 time"
        return
    }
    
    clicked = Number(clicked) + 1
    localStorage.setItem(elemId, clicked)
    clickedTimes.innerText = `${clicked} times`
    
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

        clickedTimes.innerText = '0 times'
    }
}

function hideResetButton(){
    if(!resetCounterButton.classList.contains('hide')){
        resetCounterButton.classList.toggle('hide')
    }
   
}

function downloadData(){
    if (table.childNodes.length){
        return
    }

    fetch('https://jsonplaceholder.typicode.com/users')
        .then(response => response.json())
        .then(data => createTable(data))
        .catch(error => {
            console.log(error)
        })
}

function createTable(data){
    loader.classList.toggle('hide')

    data.forEach(row => {
        const tr = document.createElement('tr')
        table.appendChild(tr)
        
        Object.keys(row).forEach(cell => {
            const requiredKeys = ['name', 'email', 'address', 'phone', 'company']

            if(requiredKeys.includes(cell)){
                let cellText
                
                if (cell == 'address'){
                    const {street, city, suite} = row[cell]
                    cellText = `${street}, ${city}, ${suite}` 
                }
                if (cell == 'company'){
                    const {name} = row[cell]
                    cellText = `${name}` 
                }

                const th = document.createElement('th')
                th.innerText = cellText ? cellText : row[cell]
                tr.appendChild(th)
            }
        })
    })
}





buttonClicksCounter.addEventListener('click', (e)=>{
    count(e.target.id)
    downloadData()
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
})