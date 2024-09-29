var currentWord = null;
var Score = 0;
const completedWords = [];
let wordPairs = []; 
var timeLeft = 15;


async function fetchWordPairs() {
    try {
        const response = await fetch('/api/words'); 
        if (!response.ok) {
            throw new Error('Error fetching word pairs');
        }
        const data = await response.json();
        wordPairs = data; 
    } catch (error) {
        console.error(error);
    }
}


async function renderedButtons() {
    const englishContainer = document.querySelector("#english-words");
    const hungarianContainer = document.querySelector("#hungarian-words");

    
    await fetchWordPairs();

    
    if (!wordPairs || wordPairs.length === 0) {
        console.error("No words found.");
        return;
    }

    const enWord = wordPairs.map(pair => pair.english);
    const huWord = wordPairs.map(pair => pair.hungarian);

    const shuffle = (array) => {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    };

    const enWordShuffle = shuffle(enWord);
    const huWordShuffle = shuffle(huWord);

    for (let i = 0; i < enWordShuffle.length; i++) {
        const enWord = enWordShuffle[i];
        const huWord = huWordShuffle[i];

        const enButton = document.createElement("button");
        enButton.innerText = enWord;
        enButton.value = enWord;
        enButton.classList.add("textbox");
        enButton.addEventListener("click", onEnglishWordClick);
        englishContainer.appendChild(enButton);

        const huButton = document.createElement("button");
        huButton.innerText = huWord;
        huButton.value = huWord;
        huButton.classList.add("textbox");
        huButton.addEventListener("click", onHungarianWordClick);
        hungarianContainer.appendChild(huButton);
    }

    updateScoreDisplay(); 
    startCountdown();
}

window.onload = renderedButtons;


function onEnglishWordClick(e) {
    const prevSelected = document.querySelector("button.selected");
    if (prevSelected != null) {
        prevSelected.classList.remove("selected");
    }

    currentWord = e.target.value;
    console.log(currentWord);
    e.target.classList.add("selected");
}


function onHungarianWordClick(e) {
    console.log(wordPairs);

    
    const matchingPair = wordPairs.find(pair => pair.english === currentWord && pair.hungarian === e.target.value);
    
    if (matchingPair) {
        console.log("yes");
        const enWordButton = document.querySelector(`button[value="${currentWord}"]`);
        enWordButton.style.display = 'none'; 
        completedWords.push(currentWord);
        e.target.style.display = 'none'; 
        Score++;
        updateScoreDisplay(); 
    } else {
        console.log("no");
    }
}


function updateScoreDisplay() {
    const scoreDisplay = document.querySelector("#score"); 
    scoreDisplay.innerText = `Score: ${Score}`; 
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

function startCountdown() {
    const countdownDisplay = document.createElement("div");
    countdownDisplay.id = "countdown";
    countdownDisplay.style.position = "absolute";
    countdownDisplay.style.top = "10px";
    countdownDisplay.style.left = "10px";
    document.body.appendChild(countdownDisplay);

    countdown = setInterval(() => {
        countdownDisplay.innerText = `Time Left: ${timeLeft}`;
        timeLeft--;

        if (timeLeft < 0) {
            clearInterval(countdown);
            alert(`Game Over! Your score: ${Score}`); 
            window.location.href = "login_page.html";
        }
    }, 1000);
}


