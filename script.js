// Elements
const questionsElement = document.getElementById("questions");
const submitBtn = document.getElementById("submit");
const scoreElement = document.getElementById("score");

// Quiz data
const questions = [
  {
    question: "What is the capital of France?",
    choices: ["Paris", "London", "Berlin", "Madrid"],
    answer: "Paris",
  },
  {
    question: "What is the highest mountain in the world?",
    choices: ["Everest", "Kilimanjaro", "Denali", "Matterhorn"],
    answer: "Everest",
  },
  {
    question: "What is the largest country by area?",
    choices: ["Russia", "China", "Canada", "United States"],
    answer: "Russia",
  },
  {
    question: "Which is the largest planet in our solar system?",
    choices: ["Earth", "Jupiter", "Mars", "Saturn"],
    answer: "Jupiter",
  },
  {
    question: "What is the capital of Canada?",
    choices: ["Toronto", "Montreal", "Vancouver", "Ottawa"],
    answer: "Ottawa",
  },
];

// Load saved answers from session storage
let userAnswers = JSON.parse(sessionStorage.getItem("progress")) || {};

// Render questions
function renderQuestions() {
  questionsElement.innerHTML = ""; // clear before rendering
  questions.forEach((q, index) => {
    const qDiv = document.createElement("div");

    const qText = document.createElement("p");
    qText.textContent = `${q.question}`;
    qDiv.appendChild(qText);

    q.choices.forEach((choice) => {
      const label = document.createElement("label");

      const radio = document.createElement("input");
      radio.type = "radio";
      radio.name = `question-${index}`;
      radio.value = choice;

      // restore selected choice
      if (userAnswers[index] === choice) {
		radio.defaultChecked = true; // important for Cypress
		radio.setAttribute("checked", "true");

		}


      // save answer on click
      radio.addEventListener("change", () => {
        userAnswers[index] = choice;
        sessionStorage.setItem("progress", JSON.stringify(userAnswers));
      });

      label.appendChild(radio);
      label.appendChild(document.createTextNode(choice));
      qDiv.appendChild(label);
      qDiv.appendChild(document.createElement("br"));
    });

    questionsElement.appendChild(qDiv);
  });
}

// Calculate and display score
submitBtn.addEventListener("click", () => {
  let score = 0;

  questions.forEach((q, index) => {
    if (userAnswers[index] === q.answer) {
      score++;
    }
  });

  // Show score
  scoreElement.textContent = `Your score is ${score} out of ${questions.length}.`;

  // Save to localStorage
  localStorage.setItem("score", score);
});

// Initial load
renderQuestions();

// Optional: show saved score if exists
const savedScore = localStorage.getItem("score");
if (savedScore !== null) {
  scoreElement.textContent = `Your score is ${savedScore} out of ${questions.length}.`;
}
