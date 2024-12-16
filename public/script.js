// import { addQuestionFetch, getAnswersFetch, getQuestionsFetch } from "../api";

let indexQuestion = 0;
if (!sessionStorage.getItem("currentTestId")) {
  sessionStorage.setItem("currentTestId", Math.random().toString());
}
const currentTestId = sessionStorage.getItem("currentTestId");
// console.log(currentTestId, "currentTestId");

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

async function getAnswersFetch() {
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
    const start = document.querySelector(".start");
    const edit = document.querySelector(".edit");
    const buttons = document.querySelector(".buttons");
    // start.classList.add("btn-start");

    // start.remove();
    buttons.remove();

    const buttClick = document.createElement("button");
    buttClick.textContent = "следующий вопрос";
    buttClick.classList.add("next-question");

    // buttClick.addEventListener("click", async (e) => {
    const loadQuestion = async () => {
      const data = await getQuestionsFetch();

      if (indexQuestion >= data.length) {
        const answers = await getAnswersFetch();
        const answersBeforeFilter = answers.filter(
          (item) => item.currentTestId === currentTestId
        );
        // console.log(answersBeforeFilter, "answersBeforeFilter");

        const correctAnswers = answersBeforeFilter.filter(
          (item) => item.answer === true
        );
        // console.log(correctAnswers.length, "123");
        buttClick.remove();
        const container = document.querySelector(".container");

        container.innerHTML = `<div class='length'>Правильных ответов:${correctAnswers.length}/2</div>`;

        return;
      }

      const currentQuestion = data[indexQuestion];
      indexQuestion++;

      const container = document.querySelector(".container");
      container.innerHTML = "";

      if (container) {
        const addedQuestion = document.createElement("div");
        addedQuestion.classList.add("add-question");
        addedQuestion.innerHTML = ` ${currentQuestion.question}`;

        container.appendChild(addedQuestion);

        currentQuestion.answers.forEach((item, index) => {
          const wrapper = document.createElement("div");
          wrapper.classList.add("wrapper");
          const radioButton = document.createElement("input");

          radioButton.type = "radio";
          radioButton.name = "question";
          radioButton.value = item.text;
          radioButton.classList.add("radio-button");

          const labelText = document.createElement("div");
          labelText.textContent = item.text;
          labelText.classList.add("label-text");

          radioButton.addEventListener("click", (e) => {
            const userAnswer = {
              currentTestId: currentTestId,
              questionId: currentQuestion._id,
              answer: item.isCorrect,
            };

            addQuestionFetch(userAnswer);
            sessionStorage.removeItem("currentTestId");
          });

          wrapper.appendChild(radioButton);
          wrapper.appendChild(labelText);
          container.appendChild(wrapper);
        });
      }

      mainPage.appendChild(container);
    };
    buttClick.addEventListener("click", loadQuestion);

    mainPage.appendChild(buttClick);
    loadQuestion();
  }
});

document.addEventListener("click", async (event) => {
  if (event.target.dataset.edit === "edit") {
    const buttons = document.querySelector(".buttons");
    buttons.remove();
    const container = document.querySelector(".container");
    container.innerHTML = "";

    // const testForm = document.createElement("input");

    const questions = await getQuestionsFetch();
    questions.map((item) => {
      const select = document.createElement("select");
      select.setAttribute("key", item.id);
      const option = document.createElement("option");
      option.value = item.question;
      option.textContent = item.question;

      select.appendChild(option);
      container.appendChild(select);

      // item.answers.map((item) => {
      //   const edidedAnswer = document.createElement("input");
      //   console.log(item.text);
      //   edidedAnswer.innerHTML = item.text;
      //   option.appendChild(edidedAnswer);
      // });
    //   const answersContainer = document.createElement("div");

    //   item.answers.map((answer) => {
    //     const editedAnswer = document.createElement("div");
    //     editedAnswer.innerHTML = answer.text; // Set the value of the input to item.text
    //     answersContainer.appendChild(editedAnswer);
    //   });
    // });

    // testForm.value = "lalalaf";
    console.log(questions);

    // container.appendChild(testForm);
  }
});
