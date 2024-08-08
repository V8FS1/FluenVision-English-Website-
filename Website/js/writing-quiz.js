const questions = [
  {
    question: "What is 'mins' short for?",
    options: ["minimum", "minute", "minutes"],
    answer: "minutes",
  },
  {
    question: "What does 'aargh' mean?",
    options: ["I'm angry.", "I'm sad.", "I'm happy."],
    answer: "I'm angry.",
  },
  {
    question:
      "What does it mean if you write two or more exclamation (!) marks?",
    options: [
      "You're angry.",
      "You're sorry.",
      "You really mean what you're saying.",
    ],
    answer: "You really mean what you're saying.",
  },
  {
    question: "What does 'LMK' mean?",
    options: ["leave my key", "let me know", "love more kisses"],
    answer: "let me know",
  },
  {
    question: "What is 'tho' short for?",
    options: ["therefore", "there", "though"],
    answer: "though",
  },
  {
    question: "What is 'thx' short for?",
    options: ["this", "thanks", "taxi"],
    answer: "thanks",
  },
  // Add more questions in a similar format
];

const quizContainer = document.querySelector(".quiz-container");
const questionsDiv = document.getElementById("questions");
const finishBtn = document.getElementById("finishBtn");
const restartBtn = document.getElementById("restartBtn");
const resultContainer = document.getElementById("result");

let correctAnswers = 0;
let quizFinished = false;

function displayQuestions() {
  let output = "";
  questions.forEach((q, index) => {
    output += `
      <div class="question" id="question${index}">
        <li>${q.question}</li>
        <div class="options">
          ${q.options
            .map(
              (option) => `
            <label>
              <input type="radio" name="question${index}" value="${option}">
              ${option}
            </label>
          `
            )
            .join("")}
        </div>
      </div>
    `;
  });
  questionsDiv.innerHTML = output;
}

function displayResults() {
  if (quizFinished) return;

  questions.forEach((q, index) => {
    const selected = document.querySelector(
      `input[name="question${index}"]:checked`
    );
    if (selected && selected.value === q.answer) {
      document.getElementById(`question${index}`).classList.add("correct");
      correctAnswers++;
    } else if (selected) {
      document.getElementById(`question${index}`).classList.add("incorrect");
    }
  });

  const percentage = ((correctAnswers / questions.length) * 100).toFixed(2);
  resultContainer.innerHTML = `Correct Answers: ${correctAnswers} / ${questions.length}<br>Percentage: ${percentage}%`;
  resultContainer.style.display = "block";
  quizFinished = true;

  // Disable radio buttons after finish
  const radioInputs = document.querySelectorAll('input[type="radio"]');
  radioInputs.forEach((input) => {
    input.disabled = true;
  });

  restartBtn.style.display = "block";

  $(document).ready(function () {
    console.log((correctAnswers / questions.length) * 100);

    var userId = localStorage.getItem("loggedInId");
    var point = ((correctAnswers / questions.length) * 100).toFixed(0);
    $.ajax({
      type: "POST", // İsteğin türü (GET, POST, vb.)
      url: "https://fluentvison.000webhostapp.com/functions/insertQuiz.php", // PHP dosyasının yolu
      data: {
        userId: userId,
        quizName: "Writing",
        point: point,
        level: "A1",
      }, // İsteğe ek veri (varsa)
      success: function (response) {
        // İsteğin başarılı olması durumunda yapılacak işlemler
        console.log(response);
        console.log(response.status);
      },
      error: function (error) {
        alert("kayıt hatası");
        // İsteğin başarısız olması durumunda yapılacak işlemler
        console.log("Error: " + error);
      },
    });
  });
}

function restartQuiz() {
  const radioInputs = document.querySelectorAll('input[type="radio"]');
  radioInputs.forEach((input) => {
    input.disabled = false;
    input.checked = false;
    const questionDiv = input.closest(".question");
    questionDiv.classList.remove("correct", "incorrect");
  });

  correctAnswers = 0;
  quizFinished = false;

  resultContainer.style.display = "none";
  restartBtn.style.display = "none";
}

finishBtn.addEventListener("click", displayResults);

restartBtn.addEventListener("click", restartQuiz);

window.addEventListener("load", displayQuestions);
