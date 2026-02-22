const words = [
    "html", "css", "javascript", "python", "developer",
    "function", "variable", "object", "array", "frontend",
    "backend", "database", "keyboard", "practice", "speed",
    "accuracy", "coding", "design", "interface", "project"
];

const wordContainer = document.getElementById("word-container");
const input = document.getElementById("input");
const timeDisplay = document.getElementById("time");
const wpmDisplay = document.getElementById("wpm");
const accuracyDisplay = document.getElementById("accuracy");

let timer = 60;
let interval = null;
let currentIndex = 0;
let correctWords = 0;
let totalTyped = 0;

function generateWords() {
    wordContainer.innerHTML = "";
    for (let i = 0; i < 40; i++) {
        const randomWord = words[Math.floor(Math.random() * words.length)];
        const span = document.createElement("span");
        span.innerText = randomWord;
        span.classList.add("word");
        if (i === 0) span.classList.add("active");
        wordContainer.appendChild(span);
    }
}

function startTimer() {
    interval = setInterval(() => {
        timer--;
        timeDisplay.innerText = timer;

        if (timer === 0) {
            clearInterval(interval);
            input.disabled = true;
            calculateResults();
        }
    }, 1000);
}

function calculateResults() {
    const wpm = correctWords;
    const accuracy = ((correctWords / totalTyped) * 100).toFixed(2) || 0;

    wpmDisplay.innerText = wpm;
    accuracyDisplay.innerText = accuracy;
}

input.addEventListener("input", () => {
    if (!interval) startTimer();

    const typedWord = input.value.trim();
    const currentWord = document.querySelectorAll(".word")[currentIndex];

    if (input.value.endsWith(" ")) {
        totalTyped++;

        if (typedWord === currentWord.innerText) {
            currentWord.classList.add("correct");
            correctWords++;
        } else {
            currentWord.classList.add("wrong");
        }

        currentWord.classList.remove("active");
        currentIndex++;
        document.querySelectorAll(".word")[currentIndex]?.classList.add("active");

        input.value = "";
    }
});

function restart() {
    clearInterval(interval);
    timer = 60;
    interval = null;
    currentIndex = 0;
    correctWords = 0;
    totalTyped = 0;

    timeDisplay.innerText = 60;
    wpmDisplay.innerText = 0;
    accuracyDisplay.innerText = 0;
    input.disabled = false;
    input.value = "";

    generateWords();
}

generateWords();