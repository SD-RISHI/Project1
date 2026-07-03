const paragraphs = [
    "Programming is the process of creating software using different programming languages. Regular practice helps improve coding and problem solving skills.",
    "Typing speed and accuracy are important skills for every software developer. Continuous practice increases productivity and confidence while working on projects.",
    "JavaScript is one of the most popular programming languages for web development. It allows developers to build interactive and dynamic web applications.",
    "Success in software development comes from consistency patience and continuous learning. Every project teaches valuable lessons for future improvement."
];

const paragraphElement = document.getElementById("paragraph");
const input = document.getElementById("input");

const timeElement = document.getElementById("time");
const wpmElement = document.getElementById("wpm");
const cpmElement = document.getElementById("cpm");
const accuracyElement = document.getElementById("accuracy");
const mistakesElement = document.getElementById("mistakes");

let timer = 60;
let interval = null;

let currentParagraph = "";
let currentIndex = 0;

let mistakes = 0;
let correctChars = 0;
let typedChars = 0;

function loadParagraph() {

    currentParagraph =
        paragraphs[Math.floor(Math.random() * paragraphs.length)];

    paragraphElement.innerHTML = "";

    currentParagraph.split("").forEach(char => {
        const span = document.createElement("span");
        span.innerText = char;
        paragraphElement.appendChild(span);
    });

    paragraphElement.querySelector("span").classList.add("current");
}

function startTimer() {

    interval = setInterval(() => {

        timer--;
        timeElement.innerText = timer;

        if (timer <= 0) {
            clearInterval(interval);
            input.disabled = true;
            calculateResults();
        }

    }, 1000);
}

input.addEventListener("input", () => {

    if (!interval)
        startTimer();

    const characters = paragraphElement.querySelectorAll("span");

    typedChars = input.value.length;

    currentIndex = typedChars;

    correctChars = 0;
    mistakes = 0;

    characters.forEach((charSpan, index) => {

        charSpan.classList.remove("correct", "wrong", "current");

        const typedChar = input.value[index];

        if (typedChar == null) {

            // Not typed yet

        }
        else if (typedChar === charSpan.innerText) {

            charSpan.classList.add("correct");
            correctChars++;

        }
        else {

            charSpan.classList.add("wrong");
            mistakes++;

        }

    });

    if (currentIndex < characters.length) {
        characters[currentIndex].classList.add("current");
    }

    mistakesElement.innerText = mistakes;

    calculateResults();

});

function calculateResults() {

    const minutes = (60 - timer) / 60;

    if (minutes <= 0) return;

    const wpm = Math.round((correctChars / 5) / minutes);

    const cpm = Math.round(correctChars / minutes);

    const accuracy =
        typedChars === 0
            ? 100
            : ((correctChars / typedChars) * 100).toFixed(1);

    wpmElement.innerText = wpm;
    cpmElement.innerText = cpm;
    accuracyElement.innerText = accuracy;
}

function restart() {

    clearInterval(interval);

    timer = 60;
    interval = null;

    currentIndex = 0;
    mistakes = 0;
    correctChars = 0;
    typedChars = 0;

    timeElement.innerText = 60;
    wpmElement.innerText = 0;
    cpmElement.innerText = 0;
    accuracyElement.innerText = 100;
    mistakesElement.innerText = 0;

    input.disabled = false;
    input.value = "";

    loadParagraph();
}

loadParagraph();
