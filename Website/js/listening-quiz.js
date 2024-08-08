const questions = [
  {
    question: "When is the table booked for?",
    options: ["Tonight", "Tomorrow morning", "Tomorrow night"],
    answer: "Tomorrow night",
  },
  {
    question:
      "When the woman says 'about eight, eight thirty', what does she mean?",
    options: [
      "At eight o'clock",
      "At half past eight",
      "Between eight o'clock and half past eight",
    ],
    answer: "Between eight o'clock and half past eight",
  },
  {
    question: "What time is the first booking?",
    options: ["7.30", "8.30", "9.00"],
    answer: "7.30",
  },
  {
    question: "How do you spell the person's name?",
    options: ["Jamei", "Jamie", "Janie"],
    answer: "Jamie",
  },
  {
    question: "Where will the table be now?",
    options: ["By the door", "Close to the kitchen", "In the corner"],
    answer: "Close to the kitchen",
  },
  {
    question: "What time is the new booking?",
    options: ["6.00", "7.30", "8.00"],
    answer: "8.00",
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
        quizName: "Listening",
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
