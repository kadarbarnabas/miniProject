// sss.js

var currentWord = null
//var maxDisplayedWords = 5
var Score = 0

const words = {apple:"alma", pear:"körte", strawberry:"eper", car:"autó", plane:"repülőgép"}

const completedWords=[]

function renderedButtons(){
    const englishContainer = document.querySelector("#english-words")
    const hungarianContainer = document.querySelector("#hungarian-words")
   
    const enWord = Object.keys(words)
    const huWord = Object.values(words)

    const shuffle = (array) => { //random kevero
        for (let i = array.length - 1; i > 0; i--) { 
          const j = Math.floor(Math.random() * (i + 1)); 
          [array[i], array[j]] = [array[j], array[i]]; 
        } 
        return array; 
      };

      const enWordShuffle = shuffle(enWord)
      const huWordShuffle = shuffle(huWord)

      for (let i = 0; i<enWordShuffle.length; i++){
        const enWord = enWordShuffle[i]
        const huWord = huWordShuffle[i]

        const enButton = document.createElement("button")
        enButton.innerText = enWord
        enButton.value = enWord
        enButton.classList.add("textbox")
        enButton.addEventListener("click", onEnglishWordClick)
        englishContainer.appendChild(enButton)

        const huButton = document.createElement("button")
        huButton.innerText = huWord
        huButton.value = huWord
        huButton.classList.add("textbox")
        huButton.addEventListener("click", onHungarianWordClick)
        hungarianContainer.appendChild(huButton)

      }
}

window.onload = renderedButtons

function onEnglishWordClick(e){

    const prevSelected = document.querySelector("button.selected")
    if (prevSelected != null){
        prevSelected.classList.remove("selected")
    }

    currentWord = e.target.value
    console.log(currentWord)
    e.target.classList.add("selected")

}

function onHungarianWordClick(e){
    console.log(words)
    
    if(words[currentWord] === e.target.value){
        console.log("yes")
        const enWordButton = document.querySelector(`button[value="${currentWord}"]`)
        enWordButton.remove()
        completedWords.push(currentWord)
        e.target.remove()
        Score ++
        //loadNextWord()
    }

    else{
        console.log("no")
    }
}


function loadNextWord() {
    const uncompletedWords = Object.entries(words).filter(x => !completedWords.includes(x[0]))

    if (completedWords.length > Object.values(words).length - maxDisplayedWords ){
        return
    }

    const nextWord = uncompletedWords[Math.floor(Math.random()*uncompletedWords.length)]
    const enWord = nextWord[0]
    const huWord = nextWord[1]


    const englishContainer = document.querySelector("#english-words")
    const hungarianContainer = document.querySelector("#hungarian-words")

    const enButton = document.createElement("button")
    enButton.innerText = enWord
    enButton.value = enWord
    enButton.classList.add("textbox")
    enButton.addEventListener("click", onEnglishWordClick)
    englishContainer.appendChild(enButton)

    const huButton = document.createElement("button")
    huButton.innerText = huWord
    huButton.value = huWord
    huButton.classList.add("textbox")
    huButton.addEventListener("click", onHungarianWordClick)
    hungarianContainer.appendChild(huButton)

    

}
