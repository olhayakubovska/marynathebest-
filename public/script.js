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

// const updateValue = (idQuestion, newValue, chechBoxValue) => {
//   fetch(`/api/questions/${idQuestion}`, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({
//       // id: Math.random(),
//       text: newValue,
//       isCorrect: chechBoxValue,
//     }),
//   });
//   // }).then((question) => {
//   //   question.json();
//   // });
// };

const updateValue = async (idQuestion, newValue, chechBoxValue) => {
  try {
    const response = await fetch(`/api/questions/${idQuestion}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        text: newValue,
        isCorrect: chechBoxValue,
      }),
    });

    if (!response.ok) {
      throw new Error("Failed to update the question");
    }

    const data = await response.json();
    // Handle the response data if needed
    console.log(data);
  } catch (error) {
    console.error("Error:", error);
  }
};

const removeQuestionFetch = async (questionId, answerId) => {
  try {
    const response = await fetch(
      `/api/questions/${questionId}?answerId=${answerId}`,
      {
        method: "DELETE",
      }
    );
    // const question = await response.json();
    // console.log(question, "question");
    return response;
    // const updatedQuestions = await getQuestionsFetch();
    // console.log(updatedQuestions, "Updated questions");

    // return updatedQuestions;
  } catch (e) {
    console.log(e);
  }
};

document.addEventListener("click", (event) => {
  if (event.target.dataset.start === "starttest") {
    const mainPage = document.querySelector(".main");
    // const start = document.querySelector(".start");
    // const edit = document.querySelector(".edit");
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
    renderQuestions(questions, container, saveNewValueButton);
  }
});

const renderQuestions = (questions, container, saveNewValueButton) => {
  questions.map((question) => {
    // console.log(item._id, "ID");
    // const select = document.createElement("select");
    const wrapperDiv = document.createElement("div");
    // select.setAttribute("key", item.id);
    wrapperDiv.classList.add("custom-dropdown");

    const toggelBtn = document.createElement("button");
    toggelBtn.innerHTML = question.question;
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
        updateValue(question._id, inputValue, chechBoxValue);
      });

      addNewQuestionBtn.disabled = true;

      removeBtn.addEventListener("click", (event) => {
        inpuWrapper.remove();
        addNewQuestionBtn.disabled = false;
        console.log("remove2");
      });

      inpuWrapper.appendChild(checkBox);
      inpuWrapper.appendChild(removeBtn);
      inpuWrapper.appendChild(newQuestionInput);
      divList.appendChild(inpuWrapper);
    });

    question.answers.map((item) => {
      const inpuWrapper = document.createElement("div");
      inpuWrapper.classList.add("input-wrapper");

      const removeBtn = document.createElement("button");
      removeBtn.classList.add("remove-btn");
      removeBtn.innerHTML = "X";

      // removeBtn.addEventListener("click", (event) => {
      //   removeQuestionFetch(question._id, item._id).then(() =>
      //     renderQuestions(questions, container, saveNewValueButton)
      //   );
      //   // console.log("remove ItemID", item._id);
      // });
      removeBtn.addEventListener("click", (event) => {
        // try {
          console.log("remove");

        //   await removeQuestionFetch(question._id, item._id);
        //   console.log("lalaall")
        //   const updatedQuestions = await getQuestionsFetch();
        //   console.log(updatedQuestions, "новые вопросы");

        //   // renderQuestions(updatedQuestions, container, saveNewValueButton);
        // } catch (error) {
        //   console.error("Ошибка при удалении вопроса:", error);
        // }
        removeQuestionFetch(question._id, item._id).then(() =>
          console.log("lalalalal2")
        );
      });

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
};
