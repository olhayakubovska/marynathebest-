let indexQuestion = 0;
if (!sessionStorage.getItem("currentTestId")) {
  sessionStorage.setItem("currentTestId", Math.random().toString());
}
const currentTestId = sessionStorage.getItem("currentTestId");
console.log(currentTestId, "currentTestId");

const getQuestionsFetch = () =>
  fetch("/api/questions").then((response) => response.json());

const addQuestionFetch = (answer) => {
  fetch("/answers", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(answer),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Failed to add question");
      }
      return response.json();
    })
    .then((result) => {
      console.log("Question added successfully:", result);
    })
    .catch((e) => {
      console.log(e, "error!");
    });
};

async function getAnswers() {
  try {
    const response = await fetch("/answers");

    const answers = await response.json();
    return answers;
  } catch (e) {
    console.log(e);
  }
}


document.addEventListener("click", (event) => {
  if (event.target.dataset.start === "starttest") {
    const mainPage = document.querySelector(".main");
    mainPage.innerHTML = "";
    
    const buttClick = document.createElement("button");
    buttClick.textContent = "lalala";
    mainPage.appendChild(buttClick);
  }
});

const butt = document.querySelector(".btn");
butt.addEventListener("click", async (e) => {
  // e.preventDefault();

  const data = await getQuestionsFetch();

  if (indexQuestion >= data.length) {
    const answers = await getAnswers();
    const answersBeforeFilter = answers.filter(
      (item) => item.currentTestId === currentTestId
    );
    console.log(answersBeforeFilter, "answersBeforeFilter");

    const correctAnswers = answersBeforeFilter.filter(
      (item) => item.answer === true
    );
    console.log(correctAnswers.length, "123");
    // console.log(correctAnswers.length, "lenght");
    // console.log(abc, "2");
    // console.log(typeof answers)
    // console.log("Вопросы закончились!", answers[0]);
    const container = document.querySelector(".container");

    container.innerHTML = "";
    container.innerHTML = `<div>${correctAnswers.length} длина!</div>`;

    return;
  }

  const currentQuestion = data[indexQuestion];
  indexQuestion++;

  const container = document.querySelector(".container");
  container.innerHTML = "";

  if (container) {
    const addedQuestion = document.createElement("div");
    addedQuestion.innerHTML = `<div> ${currentQuestion.question}</div>`;

    currentQuestion.answers.forEach((item, index) => {
      const radioButton = document.createElement("input");

      radioButton.type = "radio";
      radioButton.name = "question";
      radioButton.value = item.text;

      const labelText = document.createElement("label");
      labelText.textContent = item.text;
      // radioButton.id = `answer-${index}`;

      radioButton.addEventListener("click", (e) => {
        // e.preventDefault();
        // const idTest = sessionStorage.setItem("currentTestId", Math.random());
        // const testId = sessionStorage.getItem("currentTestId");
        console.log(currentTestId);
        const userAnswer = {
          // idTest,
          currentTestId: currentTestId,
          questionId: currentQuestion._id,
          answer: item.isCorrect,
        };
        addQuestionFetch(userAnswer);
        sessionStorage.removeItem("currentTestId");
      });

      container.appendChild(radioButton);
      container.appendChild(labelText);
    });

    container.appendChild(addedQuestion);
  }

  // console.log(indexQuestion, "indexQuestion");
});
