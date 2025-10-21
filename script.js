const startBtn = document.getElementById("startBtn");
const submitBtn = document.getElementById("submitBtn");
const retryBtn = document.getElementById("retryBtn");
const quiz = document.getElementById("quiz");
const menu = document.getElementById("menu");
const result = document.getElementById("result");
const questionEl = document.getElementById("question");
const feedback = document.getElementById("feedback");
const answerInput = document.getElementById("answer");
const scoreEl = document.getElementById("score");
const questionCountEl = document.getElementById("questionCount");
const finalScoreEl = document.getElementById("finalScore");

let currentQuestion = {};
let score = 0;
let questionNumber = 1;
let totalQuestions = 10;
let level = "easy";

startBtn.addEventListener("click", startQuiz);
submitBtn.addEventListener("click", checkAnswer);
retryBtn.addEventListener("click", () => location.reload());

function startQuiz() {
  level = document.getElementById("level").value;
  score = 0;
  questionNumber = 1;
  menu.classList.add("hidden");
  quiz.classList.remove("hidden");
  nextQuestion();
}

function generateQuestion() {
  let num1, num2, operator, answer;
  const operators = ["+", "-", "pangkat", "/"];

  switch (level) {
    case "easy":
      num1 = Math.floor(Math.random() * 10) + 1;
      num2 = Math.floor(Math.random() * 10) + 1;
      break;
    case "medium":
      num1 = Math.floor(Math.random() * 50) + 10;
      num2 = Math.floor(Math.random() * 20) + 5;
      break;
    case "hard":
      num1 = Math.floor(Math.random() * 200) + 50;
      num2 = Math.floor(Math.random() * 50) + 10;
      break;
  }

  operator = operators[Math.floor(Math.random() * operators.length)];

  // Hindari pembagian dengan nol dan buat hasil integer
  if (operator === "/") {
    num2 = num2 === 0 ? 1 : num2;
    answer = parseFloat((num1 / num2).toFixed(2));
  } else {
    answer = eval(`${num1} ${operator} ${num2}`);
  }

  return { question: `${num1} ${operator} ${num2} = ?`, answer };
}

function nextQuestion() {
  if (questionNumber > totalQuestions) {
    endQuiz();
    return;
  }

  currentQuestion = generateQuestion();
  questionEl.textContent = currentQuestion.question;
  feedback.textContent = "";
  answerInput.value = "";
  questionCountEl.textContent = questionNumber;
}

function checkAnswer() {
  const userAnswer = parseFloat(answerInput.value);
  if (isNaN(userAnswer)) {
    feedback.textContent = "Masukkan angka yang valid!";
    return;
  }

  if (Math.abs(userAnswer - currentQuestion.answer) < 0.01) {
    feedback.textContent = "✅ Benar!";
    score += 10;
  } else {
    feedback.textContent = `❌ Salah! Jawaban benar: ${currentQuestion.answer}`;
    score -= 5;
  }

  scoreEl.textContent = score;
  questionNumber++;
  setTimeout(nextQuestion, 1000);
}

function endQuiz() {
  quiz.classList.add("hidden");
  result.classList.remove("hidden");
  finalScoreEl.textContent = score;
}
