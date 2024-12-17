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

// async function updateValue(idQuestion, newValue) {
//   fetch(`/api/questions/${idQuestion}`, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({
//       answers: [{ id: Math.random(), text: newValue, isCorrect: false }],
//     }),
//   });
// }
// async function updateValue(idQuestion) {
//   fetch(`/api/questions/${idQuestion}`).then((question)=>question.json()).then((data)=>console.log(data,"dataFetch"))
// }

// const updateValue = (idQuestion) => fetch(`/api/questions/${idQuestion}`);
//     .then((response) => response.json())  // Обрабатываем JSON-ответ
//     .then((data) => console.log(data, "dataFetch")) // Логируем данные
//     .catch((error) => console.error('Error fetching data:', error)); // Ловим ошибки
// }

const updateValue = (idQuestion, newValue,chechBoxValue) => {
  fetch(`/api/questions/${idQuestion}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      // id: Math.random(),
      text: newValue,
      isCorrect: chechBoxValue,
    }),
  });
  // }).then((question) => {
  //   question.json();
  // });
};

// Вызовите функцию с ID вопроса
// updateValue('6758b086f87b04e861fcd6cb');

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

    const saveNewValueButton = document.createElement("button");
    saveNewValueButton.classList.add("save-new-value-button");
    saveNewValueButton.innerHTML = "save";

    const questions = await getQuestionsFetch();

    questions.map((item) => {
      // console.log(item._id, "ID");
      // const select = document.createElement("select");
      const wrapperDiv = document.createElement("div");
      // select.setAttribute("key", item.id);
      wrapperDiv.classList.add("custom-dropdown");

      const toggelBtn = document.createElement("button");
      toggelBtn.innerHTML = item.question;
      toggelBtn.classList.add("toggle-btn");

      const divList = document.createElement("div");
      divList.classList.add("div-list");

      const addNewQuestionBtn = document.createElement("button");
      addNewQuestionBtn.classList.add("add-new-question");
      addNewQuestionBtn.innerHTML = "+";

      divList.appendChild(addNewQuestionBtn);

      addNewQuestionBtn.addEventListener("click", (event) => {
        const inpuWrapper = document.createElement("div");
        inpuWrapper.classList.add("input-wrapper");

        const removeBtn = document.createElement("button");
        removeBtn.classList.add("remove-btn");
        removeBtn.innerHTML = "X";

        const newQuestionInput = document.createElement("input");
        const checkBox = document.createElement("input");
        checkBox.type = "checkbox";
        let chechBoxValue = false;
        checkBox.addEventListener("change", (event) => {
          // console.log("Checkbox value:", event.target.checked); // true или false
          chechBoxValue = event.target.checked;
        });
        // console.log(chechBoxValue,"checkBoxValue")
        newQuestionInput.type = "text";
        newQuestionInput.placeholder = "Add new answer...";

        saveNewValueButton.addEventListener("click", (event) => {
          const inputValue = newQuestionInput.value;
          // console.log(item._id, inputValue,"script");
          // await updateValue(item._id);
          updateValue(item._id, inputValue,chechBoxValue);
        });

        addNewQuestionBtn.disabled = true;

        removeBtn.addEventListener("click", (event) => {
          inpuWrapper.remove();
          addNewQuestionBtn.disabled = false;
        });

        inpuWrapper.appendChild(checkBox);
        inpuWrapper.appendChild(removeBtn);
        inpuWrapper.appendChild(newQuestionInput);
        divList.appendChild(inpuWrapper);
      });

      item.answers.map((item) => {
        const inpuWrapper = document.createElement("div");
        inpuWrapper.classList.add("input-wrapper");

        const removeBtn = document.createElement("button");
        removeBtn.classList.add("remove-btn");
        removeBtn.innerHTML = "X";

        const inputEdit = document.createElement("input");
        const checkBox = document.createElement("input");
        checkBox.type = "checkbox";

        inputEdit.type = "text";
        inputEdit.value = item.text;

        inpuWrapper.appendChild(checkBox);
        inpuWrapper.appendChild(removeBtn);
        inpuWrapper.appendChild(inputEdit);
        divList.appendChild(inpuWrapper);
      });

      toggelBtn.addEventListener("click", (event) => {
        divList.style.display === "none"
          ? (divList.style.display = "block")
          : (divList.style.display = "none");
      });

      wrapperDiv.appendChild(toggelBtn);
      wrapperDiv.appendChild(divList);
      container.appendChild(wrapperDiv);
      container.appendChild(saveNewValueButton);
    });
  }
});
