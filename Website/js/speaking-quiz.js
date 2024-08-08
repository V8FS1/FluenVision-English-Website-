const questions = [
  { question: "Bob wants the hammer.", answer: true },
  { question: "Paul is ill.", answer: true },
  { question: "The hammer is in the toolbox.", answer: true },
  { question: "The hammer is on the right.", answer: false },
  {
    question: "Paul gives Bob the scissors.",
    answer: false,
  },
  { question: "Paul thinks Bob spoke clearly.", answer: false },
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
        <div class="buttons-cont">
          <button class="answer-btn main-button" data-answer="true">True</button>
          <button class="answer-btn main-button" data-answer="false">False</button>
        </div>
      </div>
    `;
  });
  questionsDiv.innerHTML = output;
}

function displayResults() {
  if (quizFinished) return;

  const selectedButtons = document.querySelectorAll(".selected");
  selectedButtons.forEach((button) => {
    const answer = button.dataset.answer === "true";
    const questionDiv = button.parentElement.parentElement;
    if (
      answer ===
      questions[Number(questionDiv.id.replace("question", ""))].answer
    ) {
      button.classList.add("correct");
      correctAnswers++;
    } else {
      button.classList.add("incorrect");
    }
  });

  const percentage = ((correctAnswers / questions.length) * 100).toFixed(2);
  resultContainer.innerHTML = `Correct Answers: ${correctAnswers} / ${questions.length}<br>Percentage: ${percentage}%`;
  resultContainer.style.display = "block";
  quizFinished = true;

  // Disable answer buttons after finish
  const answerButtons = document.querySelectorAll(".answer-btn");
  answerButtons.forEach((button) => {
    button.disabled = true;
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
        quizName: "Speaking",
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
  const answerButtons = document.querySelectorAll(".answer-btn");
  answerButtons.forEach((button) => {
    button.disabled = false;
    button.classList.remove("correct", "incorrect", "selected");
  });

  correctAnswers = 0;
  quizFinished = false;

  resultContainer.style.display = "none";
  restartBtn.style.display = "none";
}

finishBtn.addEventListener("click", displayResults);
restartBtn.addEventListener("click", restartQuiz);

questionsDiv.addEventListener("click", (event) => {
  if (event.target.matches(".answer-btn") && !quizFinished) {
    const selected = event.target;
    selected.parentElement.querySelectorAll(".answer-btn").forEach((btn) => {
      btn.classList.remove("selected");
    });
    selected.classList.add("selected");
  }
});

window.addEventListener("load", displayQuestions);
