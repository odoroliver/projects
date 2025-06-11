const startScreen = document.getElementById("start-screen");
const questionScreen = document.getElementById("question-screen");
const resultScreen = document.getElementById("result-screen");
const questionText = document.getElementById("question-text");
const currentQuestionSpan = document.getElementById("current-question");
const totalQuestion = document.getElementById("total-question");
const scoreSpan = document.getElementById("score");
const answersContainer = document.getElementById("answers-container");
const finalScore = document.getElementById("final-score");
const maxScore = document.getElementById("max-score");
const resultMessage = document.getElementById("result-message");
const startBtn = document.getElementById("startBtn");
const restartBtn = document.getElementById("restartBtn");
const progress = document.getElementById("progress");

const quizQuestions = [
  {
    question: "What is the capital of France?",
    answers: [
      { text: "London", correct: false },
      { text: "Berlin", correct: false },
      { text: "Paris", correct: true },
      { text: "Madrid", correct: false },
    ],
  },
  {
    question: "Which planet is known as the Red Planet?",
    answers: [
      { text: "Venus", correct: false },
      { text: "Mars", correct: true },
      { text: "Jupiter", correct: false },
      { text: "Saturn", correct: false },
    ],
  },
  {
    question: "What is the largest ocean on Earth?",
    answers: [
      { text: "Atlantic Ocean", correct: false },
      { text: "Indian Ocean", correct: false },
      { text: "Arctic Ocean", correct: false },
      { text: "Pacific Ocean", correct: true },
    ],
  },
  {
    question: "Which of these is NOT a programming language?",
    answers: [
      { text: "Java", correct: false },
      { text: "Python", correct: false },
      { text: "Banana", correct: true },
      { text: "JavaScript", correct: false },
    ],
  },
  {
    question: "What is the chemical symbol for gold?",
    answers: [
      { text: "Go", correct: false },
      { text: "Gd", correct: false },
      { text: "Au", correct: true },
      { text: "Ag", correct: false },
    ],
  },
];

let currentQuestionIndex = 0; 
let score = 0;
let answersDisabled = false;

totalQuestion.textContent = quizQuestions.length;
maxScore.textContent = quizQuestions.length;

startBtn.addEventListener("click", startQuiz);
restartBtn.addEventListener("click", restartQuiz);

function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  scoreSpan.textContent = score;

  startScreen.classList.remove("active");
  questionScreen.classList.add("active");

  showQuestion();
}

function showQuestion() {
  answersDisabled = false;

  const currentQuestion = quizQuestions[currentQuestionIndex];

  currentQuestionSpan.textContent = currentQuestionIndex + 1;

  const progressPercent = (currentQuestionIndex / quizQuestions.length) * 100;
  progress.style.width = progressPercent + "%";

  questionText.textContent = currentQuestion.question;

  answersContainer.innerHTML = "";

  currentQuestion.answers.forEach((answer) => {
    const button = document.createElement("button");
    button.textContent = answer.text;
    button.classList.add("answerBtn");
    button.dataset.correct = answer.correct;
    button.addEventListener("click", selectAnswer) 
    answersContainer.appendChild(button);
  })

}

function selectAnswer(event) {
  if(answersDisabled) return;

  answersDisabled = true;

  const selectedBtn = event.target;

  Array.from(answersContainer.children).forEach(button => {
    if(button.dataset.correct === "true") {
      button.classList.add("correct");
    } else if(selectedBtn === button) {
      button.classList.add("incorrect");
    }
  })

  const isCorrect = selectedBtn.dataset.correct === "true";
  if(isCorrect) {
    score++;
    scoreSpan.textContent = score;
  }

  setTimeout(() => {
    
    currentQuestionIndex++;

    if(currentQuestionIndex < quizQuestions.length) {
      showQuestion();
    } else {
      showResults();
    }
  }, 1000)
}

function showResults() {
  questionScreen.classList.remove("active");
  resultScreen.classList.add("active");

  finalScore.textContent = score;

  const percentage = (score / quizQuestions.length) * 100;

  if (percentage === 100) {
    resultMessage.textContent = "Perfect! You're a genius!";
  } else if (percentage >= 80) {
    resultMessage.textContent = "Great job! You know your stuff!";
  } else if (percentage >= 60) {
    resultMessage.textContent = "Good effort! Keep learning!";
  } else if (percentage >= 40) {
    resultMessage.textContent = "Not bad! Try again to improve!";
  } else {
    resultMessage.textContent = "Keep studying! You'll get better!";
  }
}

function restartQuiz() {
  resultScreen.classList.remove("active");
  startQuiz();
}