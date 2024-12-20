// import { addQuestionFetch, getAnswersFetch, getQuestionsFetch } from "../api";

let indexQuestion = 0;
if (!sessionStorage.getItem("currentTestId")) {
  sessionStorage.setItem("currentTestId", Math.random().toString());
}
const currentTestId = sessionStorage.getItem("currentTestId");
// console.log(currentTestId, "currentTestId");

const getQuestionsFetch = async () => {
  try {
    const response = await fetch("questions");
    const data = await response.json();
    return data;
  } catch (e) {
    console.log(e);
  }
};

const addUserAnswerFetch = async (answer) => {
  try {
    const response = await fetch("/answersfromuser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(answer),
    });

    if (!response.ok) {
      throw new Error("Failed to add question");
    }

    const result = await response.json();
    console.log("Question added successfully:", result);
    return result;
  } catch (error) {
    console.error("Error:", error);
  }
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

const saveNewAnswerFetch = async (idQuestion, newValue, chechBoxValue) => {
  try {
    const response = await fetch(
      // `http://localhost:3000/questions/${idQuestion}`,
      `questions/${idQuestion}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          text: newValue,
          isCorrect: chechBoxValue,
        }),
      }
    );

    if (!response.ok) {
      throw new Error("Failed to update the question");
    }

    const data = await response.json();
    console.log(data, "dataFetch");
    return data;
  } catch (error) {
    console.error("Error:", error);
  }
};

const removeAnswerFetch = async (questionId, answerId) => {
  try {
    const response = await fetch(
      `questions/${questionId}?answerId=${answerId}`,
      {
        method: "DELETE",
      }
    );

    const questions = await response.json(); // Возвращаем данные из ответа
    // console.log(questions, "questions from fetch");
    return questions;
  } catch (e) {
    console.log(e);
  }
};

// const updateQuestionFetch = (idQuestion, newANswerValue, newchechBoxValue) => {
//   fetch(`questions/${idQuestion}`, {
//     method: "PUT",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({
//       // id: Math.random(),
//       text: newANswerValue,
//       isCorrect: newchechBoxValue,
//     }),
//   });
//   // }).then((question) => {
//   //   question.json();
//   // });
// };

////////////////////////////////////

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

        container.innerHTML = `<div class='length'>Правильных ответов:${correctAnswers.length}/3</div>`;

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

            addUserAnswerFetch(userAnswer);
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

    // const saveNewValueButton = document.createElement("button");
    // saveNewValueButton.classList.add("save-new-value-button");
    // saveNewValueButton.innerHTML = "save";
    const questions = await getQuestionsFetch();
    renderQuestions(questions, container);
  }
});

const renderQuestions = (questions, container) => {
  container.innerHTML = "";
  questions.map((question) => {
    /*контейнер для вопроса с ответами*/
    const wrapperDiv = document.createElement("div");
    wrapperDiv.classList.add("custom-dropdown");

    /*кнопка показать/спрятать вопрос*/
    const toggelBtn = document.createElement("button");
    toggelBtn.innerHTML = question.question;
    toggelBtn.classList.add("toggle-btn");

    // /*редактировать вопрос*/
    // const inputForQuestionEditing = document.createElement("input");
    // inputForQuestionEditing.classList.add("question");
    // inputForQuestionEditing.value = question.question;
    // inputForQuestionEditing.addEventListener("input", (e) => {
    //   qwuestionNewValue = e.target.value;
    //   console.log(qwuestionNewValue, "question");
    // });

    /*код для добавления нового вопроса*/
    const divListAnswers = document.createElement("div");
    divListAnswers.classList.add("div-list");

    const addNewAnswerBtn = document.createElement("button");
    addNewAnswerBtn.classList.add("add-new-answer");
    addNewAnswerBtn.innerHTML = "+";

    addNewAnswerBtn.addEventListener("click", (event) => {
      const wrapperForOneAnswer = document.createElement("div");
      wrapperForOneAnswer.classList.add("input-wrapper");

      const removeAnswerBtn = document.createElement("button");
      removeAnswerBtn.classList.add("remove-btn");
      removeAnswerBtn.innerHTML = "X";
      removeAnswerBtn.addEventListener("click", (event) => {
        wrapperForOneAnswer.remove();
        addNewAnswerBtn.disabled = false;
      });

      const newAnswerInput = document.createElement("input");
      newAnswerInput.type = "text";
      newAnswerInput.placeholder = "Add new answer...";

      const checkBox = document.createElement("input");
      checkBox.type = "checkbox";
      let chechBoxValue = false;
      checkBox.addEventListener("change", (event) => {
        chechBoxValue = event.target.checked;
      });

      addNewAnswerBtn.disabled = true;

      const saveNewAnswer = document.createElement("button");
      saveNewAnswer.innerHTML = "save";
      saveNewAnswer.addEventListener("click", async (event) => {
        const inputValue = newAnswerInput.value;
        // console.log(question._id, inputValue, chechBoxValue, "save");
        const newAnswers = await saveNewAnswerFetch(
          question._id,
          inputValue,
          chechBoxValue
        );
        // renderAnswers(newAnswers, divListAnswers, question._id);
        // console.log(newAnswers, "newAnswers");
      });

      wrapperForOneAnswer.appendChild(checkBox);
      wrapperForOneAnswer.appendChild(removeAnswerBtn);
      wrapperForOneAnswer.appendChild(newAnswerInput);
      wrapperForOneAnswer.appendChild(saveNewAnswer);
      divListAnswers.appendChild(wrapperForOneAnswer);
    });

    divListAnswers.appendChild(addNewAnswerBtn);
    /*тут заканчивается код для добавления нового вопроса*/

    renderAnswers(question.answers, divListAnswers, question._id);

    toggelBtn.addEventListener("click", (event) => {
      divListAnswers.style.display === "none"
        ? (divListAnswers.style.display = "block")
        : (divListAnswers.style.display = "none");
    });

    container.appendChild(wrapperDiv);
    wrapperDiv.appendChild(toggelBtn);
    wrapperDiv.appendChild(divListAnswers);
    // container.appendChild(saveNewValueButton);
  });
};

const renderAnswers = (answers, divListAnswers, questionId) => {
  divListAnswers.innerHTML = "";

  const saveNewValueButton = document.createElement("button");
  saveNewValueButton.classList.add("save-new-value-button");
  saveNewValueButton.innerHTML = "save";

  answers.map((item) => {
    const wrapperForOneAnswer = document.createElement("div");
    wrapperForOneAnswer.classList.add("input-wrapper");

    const answer = document.createElement("input");
    answer.type = "text";
    answer.value = item.text;
    let newInputValue = "";
    answer.addEventListener("input", (e) => {
      // console.log(`Updated answer text: ${e.target.value}`);
      newInputValue = e.target.value;
    });

    const checkBox = document.createElement("input");
    checkBox.type = "checkbox";
    // checkBox.checked = item.isSelected || false; // Assuming `item.isSelected` holds the checkbox state
    let newCheckBoxValue = false;
    checkBox.addEventListener("change", (e) => {
      // console.log(`Checkbox state changed: ${e.target.checked}`);
      newCheckBoxValue = e.target.checked;
    });

    const removeAnswerBtn = document.createElement("button");
    removeAnswerBtn.classList.add("remove-btn");
    removeAnswerBtn.innerHTML = "X";
    removeAnswerBtn.addEventListener("click", async () => {
      const data = await removeAnswerFetch(questionId, item._id);
      const updatedQuestion = data.find((q) => q._id === questionId);
      if (updatedQuestion) {
        console.log(updatedQuestion.answers, "Updated answers after removal");
        renderAnswers(updatedQuestion.answers, divListAnswers, questionId);
      }
    });

    // saveNewValueButton.addEventListener("click", async (e) => {
    //   const data = await getQuestionsFetch();
    //   console.log(data);
    //   const quest = data.find((q) => q._id === questionId);
    //   console.log("SaveeF", newInputValue, newCheckBoxValue, quest);
    // });
    saveNewValueButton.addEventListener("click", async (e) => {
      const data = await getQuestionsFetch();
      console.log(data);
      const quest = data.find((q) => q._id === questionId);
      console.log("Savee", newInputValue, newCheckBoxValue, quest);
    });

    wrapperForOneAnswer.appendChild(checkBox);
    wrapperForOneAnswer.appendChild(removeAnswerBtn);
    wrapperForOneAnswer.appendChild(answer);
    divListAnswers.appendChild(wrapperForOneAnswer);
    divListAnswers.appendChild(saveNewValueButton);
  });
  // console.log("lalala", newCheckBoxValue);

  const addNewAnswerBtn = document.createElement("button");
  addNewAnswerBtn.classList.add("add-new-answer");
  addNewAnswerBtn.innerHTML = "+";
  addNewAnswerBtn.addEventListener("click", () => {
    const wrapperForOneAnswer = document.createElement("div");
    wrapperForOneAnswer.classList.add("input-wrapper");

    const newAnswerInput = document.createElement("input");
    newAnswerInput.type = "text";
    newAnswerInput.placeholder = "Add new answer...";

    const checkBox = document.createElement("input");
    checkBox.type = "checkbox";
    let checkBoxValue = false;
    checkBox.addEventListener("change", (event) => {
      checkBoxValue = event.target.checked;
    });

    const saveNewAnswerBtn = document.createElement("button");
    saveNewAnswerBtn.innerHTML = "Save";
    saveNewAnswerBtn.addEventListener("click", async () => {
      const newAnswerText = newAnswerInput.value;

      const data = await saveNewAnswerFetch(
        questionId,
        newAnswerText,
        checkBoxValue
      );

      const updatedQuestion = data.find((q) => q._id === questionId); // Locate the updated question
      if (updatedQuestion) {
        console.log(updatedQuestion.answers, "Updated answers after removal");
        renderAnswers(updatedQuestion.answers, divListAnswers, questionId);
      }
    });

    const removeAnswerBtn = document.createElement("button");
    removeAnswerBtn.classList.add("remove-btn");
    removeAnswerBtn.innerHTML = "X";
    removeAnswerBtn.addEventListener("click", () => {
      wrapperForOneAnswer.remove();
    });

    wrapperForOneAnswer.appendChild(checkBox);
    wrapperForOneAnswer.appendChild(removeAnswerBtn);
    wrapperForOneAnswer.appendChild(newAnswerInput);
    wrapperForOneAnswer.appendChild(saveNewAnswerBtn);

    divListAnswers.appendChild(wrapperForOneAnswer);
  });

  divListAnswers.appendChild(addNewAnswerBtn);
};

// const renderAnswers = (answers, divListAnswers, questionId) => {
//   divListAnswers.innerHTML = "";
//   answers.map((item) => {
//     const wrapperForOneAnswer = document.createElement("div");
//     wrapperForOneAnswer.classList.add("input-wrapper");

//     const answer = document.createElement("input");
//     const checkBox = document.createElement("input");
//     checkBox.type = "checkbox";

//     answer.type = "text";
//     answer.value = item.text;
//     answer.addEventListener("input", (e) => {
//       console.log(e.target.value);
//     });

//     const removeAnswerBtn = document.createElement("button");
//     removeAnswerBtn.classList.add("remove-btn");
//     removeAnswerBtn.innerHTML = "X";
//     removeAnswerBtn.addEventListener("click", async (event) => {
//       const data = await removeAnswerFetch(questionId, item._id);
//       // if (data._id === questionId) {
//       //   console.log("yes");
//       // } else {
//       //   console.log("no");
//       // }
//       const abc = data.filter((e) => e._id === questionId);
//       // console.log(abc, "filter");
//       // console.log(questionId, "questionId");

//       console.log(abc[0].answers, "BEFORE REMOVE");
//       // renderQuestions(data, container, saveNewValueButton);
//       renderAnswers(abc[0].answers, divListAnswers, questionId);
//     });

//     // const saveUdatedQuestion =
//     // saveNewValueButton.addEventListener("click", (e) => {
//     //   console.log("update");
//     // });

//     wrapperForOneAnswer.appendChild(checkBox);
//     wrapperForOneAnswer.appendChild(removeAnswerBtn);
//     wrapperForOneAnswer.appendChild(answer);
//     divListAnswers.appendChild(wrapperForOneAnswer);
//     // wrapperForOneAnswer.appendChild(saveUdatedQuestion)
//   });
// };
