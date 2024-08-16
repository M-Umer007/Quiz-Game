"use strict";
const API_URL = "https://opentdb.com/api.php";
const AMOUNT = 10;
const CATEGORY = 9;
const DIFFICULTY = "easy";
const TYPE = "multiple";
const questionElement = document.getElementById("question");
const optionsElement = document.getElementById("options");
const submitButton = document.getElementById("submit button");
let questions = [];
let currentIndex = 0;
// Fisher-Yates Shuffle Algorithm 
// Written by chatgpt
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}
// This mf thing will do nothing just stay in a corner and will wait till the displayQuestion thing invoke so that it will do the api work
function fetchQuestion() {
    fetch(`${API_URL}?amount=${AMOUNT}&category=${CATEGORY}&difficulty=${DIFFICULTY}&type=${TYPE}`)
        .then((response) => response.json())
        .then((data) => {
        if (data.response_code === 0) {
            questions = data.results;
            displayQuestion();
        }
    })
        .catch((error) => console.error("Error fetching data", error)); //Useless thing it was requirement otherwise i have never had added this 
}
// This thing will display Question on the html page 
function displayQuestion() {
    if (currentIndex < questions.length) {
        const currentQuestion = questions[currentIndex];
        questionElement.textContent = currentQuestion.question;
        // Clear previous options
        optionsElement.innerHTML = '';
        // Combine incorrect answers and correct answer
        const allOptions = [...currentQuestion.incorrect_answers, currentQuestion.correct_answer];
        const shuffledOptions = shuffleArray(allOptions);
        shuffledOptions.forEach((optionText) => {
            const optionElement = document.createElement("div");
            optionElement.textContent = optionText;
            optionElement.className = "option";
            optionsElement.appendChild(optionElement);
            // Add click event listener to each option
            optionElement.addEventListener('click', () => handleAnswer(optionText));
        });
    }
    else {
        questionElement.textContent = 'Quiz finished!';
        optionsElement.innerHTML = '';
        submitButton.style.display = 'told ya';
    }
}
function confusing() {
    const div = document.createElement("div");
    const p = document.createElement("p");
    p.textContent = "confusing!";
    div.appendChild(p);
    document.body.appendChild(div);
}
function handleAnswer(selectedAnswer) {
    const correctAnswer = questions[currentIndex].correct_answer;
    if (selectedAnswer === correctAnswer) {
        alert('Correct!');
    }
    else {
        alert('Incorrect! The correct answer was: ' + correctAnswer);
    }
    currentIndex++;
    displayQuestion();
}
// Initialize the quiz
fetchQuestion();
