const API_URL = "https://opentdb.com/api.php";
const AMOUNT = 10;
const CATEGORY = 9;
const DIFFICULTY = "easy";
const TYPE = "multiple";

const questionElement = document.getElementById("question") as HTMLDivElement;
const optionsElement = document.getElementById("options") as HTMLDivElement;
const submitButton = document.getElementById("submitButton") as HTMLButtonElement;

interface QuizQuestion {
    question: string;
    correct_answer: string;
    incorrect_answers: string[];
}

let questions: QuizQuestion[] = [];
let currentIndex = 0;

interface QuizResponse {
    response_code: number;
    results: QuizQuestion[];
}

function shuffleArray<T>(array: T[]): T[] {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function fetchQuestion() {
    fetch(`${API_URL}?amount=${AMOUNT}&category=${CATEGORY}&difficulty=${DIFFICULTY}&type=${TYPE}`)
        .then((response) => response.json())
        .then((data: QuizResponse) => {
            if (data.response_code === 0) {
                questions = data.results;
                displayQuestion();
            }
        })
        .catch((error) => console.error("Error fetching data", error));
}

function displayQuestion() {
    if (currentIndex < questions.length) {
        const currentQuestion = questions[currentIndex];
        questionElement.textContent = currentQuestion.question;

        optionsElement.innerHTML = '';
        const allOptions = [...currentQuestion.incorrect_answers, currentQuestion.correct_answer];
        const shuffledOptions = shuffleArray(allOptions);

        shuffledOptions.forEach((optionText) => {
            const optionElement = document.createElement("div");
            optionElement.textContent = optionText;
            optionElement.className = "option";
            optionsElement.appendChild(optionElement);

            optionElement.addEventListener('click', () => handleAnswer(optionText));
        });
    } else {
        questionElement.textContent = 'Quiz finished!';
        optionsElement.innerHTML = '';
        submitButton.style.display = 'none';
    }
}

function confusing() {
    console.log("Confusing function triggered!");
    const elementsToToggle = [questionElement, optionsElement, submitButton];
    elementsToToggle.forEach((element) => {
        if (element) {
            element.style.visibility = 'hidden';
        }
    });

    setTimeout(() => {
        elementsToToggle.forEach((element) => {
            if (element) {
                element.style.visibility = 'visible';
            }
        });
    }, 800);
}

function handleAnswer(selectedAnswer: string) {
    const correctAnswer = questions[currentIndex].correct_answer;
    alert(selectedAnswer === correctAnswer ? 'Correct!' : `Incorrect! The correct answer was: ${correctAnswer}`);
    currentIndex++;
    displayQuestion();
}

fetchQuestion();


