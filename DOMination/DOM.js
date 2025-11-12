const optionsContainer = document.getElementById("answers");
const nextButton = document.getElementById("next-btn");
const scoreElement = document.getElementById("score");
const restartButton = document.getElementById("restart-btn");
const questionContainer = document.getElementById("question-container");
const scoreContainer = document.getElementById("results-container");
const optionButtons = document.querySelectorAll(".option-btn");
const startButton = document.getElementById("start-btn");
const question = document.getElementById("question");

const quizData = [
  {
    question: "which NFL team plays in Detroit, MI?",
    options: ["Lions", "Packers", "Bears", "Vikings"],
    answer: 0,
  },
  {
    question: "which NFL team plays in Green Bay, WI?",
    options: ["Lions", "Packers", "Bears", "Vikings"],
    answer: 1,
  },
  {
    question: "which NFL team plays in Chicago, IL?",
    options: ["Lions", "Packers", "Bears", "Vikings"],
    answer: 2,
  },
  {
    question: "which NFL team plays in Minnesota, MN?",
    options: ["Lions", "Packers", "Bears", "Vikings"],
    answer: 3,
  },
  {
    question: "which NFL division are these teams in?",
    options: ["NFC East", "NFC South", "NFC North", "NFC West"],
    answer: 2,
  },
];

let currentQuestionIndex = 0;
let score = 0;
let selectedOptions = [];

startButton.addEventListener("click", () => {
  startButton.classList.add("hidden");
  loadQuestion();
  nextButton.classList.remove("hidden");
  //set the next button to visible now
});

function loadQuestion() {
  if (currentQuestionIndex < quizData.length) {
    const currentQuestion = quizData[currentQuestionIndex];
    question.innerText = currentQuestion.question;
    optionsContainer.innerHTML = "";
    let feedback = document.getElementById("feedback");
    if (feedback) feedback.remove();

    currentQuestion.options.forEach((option, idx) => {
      const button = document.createElement("button");
      button.innerText = option;
      button.classList.add("option-btn");
      button.addEventListener("click", function () {
        const allButtons = optionsContainer.querySelectorAll("buttons");
        allButtons.forEach((btn) => (btn.disabled = true));

        let feedback = document.createElement("div");
        feedback.id = "feedback";
        if (idx === currentQuestion.answer) {
          feedback.innerText = "correct";
          button.classList.add("correct");
          score++;
        } else {
          feedback.innerText = "incorrect";
          button.classList.add("incorrect");
          allButtons[currentQuestion.answer].classList.add("correct");
        }
        optionsContainer.appendChild(feedback);
      });
      optionsContainer.appendChild(button);
    });
    currentQuestionIndex++;
  } else {
    showScore();
  }
}

//eventlistiner for next button that runs load questuin function
nextButton.addEventListener("click", () => {
  optionsContainer.innerHTML = "";
  loadQuestion();
});

function showScore() {
  if (currentQuestionIndex === quizData.length) {
    questionContainer.innerHTML = "";
    scoreElement.innerText = `Score: ${score} / ${quizData.length}`;
    scoreContainer.classList.remove("hidden");
    restartButton.addEventListener("click", () => {
      location.reload();
    });
  }
}
