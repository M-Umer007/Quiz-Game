var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var API_URL = "https://opentdb.com/api.php";
var AMOUNT = 10;
var CATEGORY = 9;
var DIFFICULTY = "easy";
var TYPE = "multiple";
var questionElement = document.getElementById("question");
var optionsElement = document.getElementById("options");
var submitButton = document.getElementById("submitButton");
var questions = [];
var currentIndex = 0;
function shuffleArray(array) {
    var _a;
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        _a = [array[j], array[i]], array[i] = _a[0], array[j] = _a[1];
    }
    return array;
}
function fetchQuestion() {
    fetch("".concat(API_URL, "?amount=").concat(AMOUNT, "&category=").concat(CATEGORY, "&difficulty=").concat(DIFFICULTY, "&type=").concat(TYPE))
        .then(function (response) { return response.json(); })
        .then(function (data) {
        if (data.response_code === 0) {
            questions = data.results;
            displayQuestion();
        }
    })
        .catch(function (error) { return console.error("Error fetching data", error); });
}
function displayQuestion() {
    if (currentIndex < questions.length) {
        var currentQuestion = questions[currentIndex];
        questionElement.textContent = currentQuestion.question;
        optionsElement.innerHTML = '';
        var allOptions = __spreadArray(__spreadArray([], currentQuestion.incorrect_answers, true), [currentQuestion.correct_answer], false);
        var shuffledOptions = shuffleArray(allOptions);
        shuffledOptions.forEach(function (optionText) {
            var optionElement = document.createElement("div");
            optionElement.textContent = optionText;
            optionElement.className = "option";
            optionsElement.appendChild(optionElement);
            optionElement.addEventListener('click', function () { return handleAnswer(optionText); });
        });
    }
    else {
        questionElement.textContent = 'Quiz finished!';
        optionsElement.innerHTML = '';
        submitButton.style.display = 'none';
    }
}
function confusing() {
    console.log("Confusing function triggered!");
    var elementsToToggle = [questionElement, optionsElement, submitButton];
    elementsToToggle.forEach(function (element) {
        if (element) {
            element.style.visibility = 'hidden';
        }
    });
    setTimeout(function () {
        elementsToToggle.forEach(function (element) {
            if (element) {
                element.style.visibility = 'visible';
            }
        });
    }, 800);
}
function handleAnswer(selectedAnswer) {
    var correctAnswer = questions[currentIndex].correct_answer;
    alert(selectedAnswer === correctAnswer ? 'Correct!' : "Incorrect! The correct answer was: ".concat(correctAnswer));
    currentIndex++;
    displayQuestion();
}
fetchQuestion();
