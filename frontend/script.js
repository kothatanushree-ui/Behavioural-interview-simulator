const questions = [
  "Tell me about a time you faced a challenge.",
  "Describe a situation where you worked in a team.",
  "Tell me about a failure and what you learned."
];

let current = 0;
let totalScore = 0;
let time = 30;
let timer;

const progress = document.getElementById("progress");
const questionBox = document.getElementById("question");
const timeBox = document.getElementById("time");

// LOGIN
function login() {
  const name = document.getElementById("username").value;
  if (name === "") {
    alert("Enter your name");
    return;
  }
  localStorage.setItem("user", name);
  document.getElementById("user").innerText = name;
  document.getElementById("loginBox").style.display = "none";
  document.getElementById("app").style.display = "block";
  loadQuestion();
}

// LOAD QUESTION
function loadQuestion() {
  questionBox.innerText = questions[current];
  document.getElementById("answer").value = "";
  document.getElementById("result").style.display = "none";
  startTimer();
}

// TIMER
function startTimer() {
  clearInterval(timer);
  time = 30;
  timeBox.innerText = time;

  timer = setInterval(() => {
    time--;
    timeBox.innerText = time;
    if (time === 0) submitAnswer();
  }, 1000);
}

// SUBMIT ANSWER → BACKEND
function submitAnswer() {
  clearInterval(timer);

  const answer = document.getElementById("answer").value;
  if (answer.trim() === "") {
    alert("Please type an answer");
    return;
  }

  fetch("http://127.0.0.1:5000/ask", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ answer: answer })
  })
  .then(res => res.json())
  .then(data => {
    const score = data.score;
    const feedback = data.feedback;

    totalScore += score;

    document.getElementById("result").style.display = "block";
    document.getElementById("score").innerText = score;
    document.getElementById("feedback").innerHTML =
      feedback.map(f => "• " + f).join("<br>");

    current++;
    progress.style.width = (current / questions.length) * 100 + "%";

    setTimeout(() => {
      if (current < questions.length) {
        loadQuestion();
      } else {
        showFinal();
      }
    }, 2500);
  })
  .catch(err => {
    console.error(err);
    alert("Backend not responding. Is Flask running?");
  });
}

// FINAL SCREEN
function showFinal() {
  document.getElementById("app").innerHTML = `
    <h1>Interview Completed 🎉</h1>
    <div class="score-box">
      <h2>Final Score</h2>
      <h1>${(totalScore / questions.length).toFixed(1)} / 10</h1>
      <button onclick="location.reload()">Try Again</button>
    </div>
  `;
}

// ENTER KEY SUPPORT
document.getElementById("answer").addEventListener("keydown", function (e) {
  if (e.key === "Enter" && !e.shiftKey) {
    e.preventDefault();
    submitAnswer();
  }
});
