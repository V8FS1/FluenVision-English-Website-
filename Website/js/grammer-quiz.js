const questions = [
  {
    question:
      "She ____________ to the store when she realized she forgot her wallet. { go }",
    answer: "was going",
  },
  {
    question:
      "If it rains, we ____________ the picnic to next weekend. { postpone }",
    answer: "will postpone",
  },
  {
    question: "They ____________ dinner when the power went out. { have }",
    answer: "were having",
  },
  {
    question:
      "Before I left for work, I ____________ my keys on the kitchen counter. { left }",
    answer: "had left",
  },
  {
    question:
      "It's important to ____________ a healthy lifestyle by eating well and exercising regularly. { maintain }",
    answer: "maintain",
  },
  {
    question:
      "She was so tired that she ____________ asleep during the movie. { fell }",
    answer: "fell",
  },
  {
    question:
      "By the time they arrive, we ____________ setting up the decorations. { finish }",
    answer: "will have finished",
  },
  {
    question:
      "I can't believe you ____________ your phone at home again! { left }",
    answer: "left",
  },
  {
    question:
      "She suggested ____________ a break after working for several hours. { take }",
    answer: "taking",
  },
  {
    question:
      "If it ____________ tomorrow, we'll have the picnic indoors. { rain }",
    answer: "rains",
  },
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
        <input type="text" class="answer-input" placeholder="Enter your answer">
      </div>
    `;
  });
  questionsDiv.innerHTML = output;
}

function displayResults() {
  if (quizFinished) return;

  var answerInputs = document.querySelectorAll(".answer-input");
  answerInputs.forEach((input, index) => {
    const userAnswer = input.value.trim().toLowerCase();
    const questionDiv = input.parentElement;
    if (userAnswer === questions[index].answer.toLowerCase()) {
      questionDiv.classList.add("correct");
      correctAnswers++;
    } else {
      questionDiv.classList.add("incorrect");
    }
  });

  const percentage = ((correctAnswers / questions.length) * 100).toFixed(2);
  resultContainer.innerHTML = `Correct Answers: ${correctAnswers} / ${questions.length}<br>Percentage: ${percentage}%`;
  resultContainer.style.display = "block";
  quizFinished = true;

  // Disable answer inputs after finish
  var answerInputs = document.querySelectorAll(".answer-input");
  answerInputs.forEach((input) => {
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
        quizName: "Grammer",
        point: point,
        level: "B2",
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
  const answerInputs = document.querySelectorAll(".answer-input");
  answerInputs.forEach((input) => {
    input.disabled = false;
    input.value = "";
    const questionDiv = input.parentElement;
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
