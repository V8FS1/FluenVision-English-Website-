const questions = [
  {
    question: "This holds your trousers up. It goes around your waist.",
    options: ["belt", "cap", "necklace"],
    answer: "belt",
  },
  {
    question:
      "You wear this on your head. It protects your head and eyes from the sun.",
    options: ["bag", "cap", "earrings"],
    answer: "cap",
  },
  {
    question: "You wear these to see better.",
    options: ["glasses", "pocket", "scarf"],
    answer: "glasses",
  },
  {
    question: "You wear this on your back.",
    options: ["gloves", "necklace", "rucksack"],
    answer: "rucksack",
  },
  {
    question: "You wear this to keep warm. It goes around your neck.",
    options: ["bracelet", "hat", "scarf"],
    answer: "scarf",
  },
  {
    question:
      "This is a place in your trousers or shirt. You can put things like your phone and money here.",
    options: ["cap", "hat", "pocket"],
    answer: "pocket",
  },
  {
    question: "You wear these on your hands when it's cold.",
    options: ["earrings", "gloves", "hat"],
    answer: "gloves",
  },
  {
    question: "You wear these on your ears.",
    options: ["bag", "earrings", "necklace"],
    answer: "earrings",
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
              <span>${option}</span>
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
        quizName: "Vocabulary",
        point: point,
        level: "A1 - A2",
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
