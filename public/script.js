// // import { addQuestionFetch, getAnswersFetch, getQuestionsFetch } from "../api";
// function synchronizeCssStyles(src, destination, recursively) {

//   // if recursively = true, then we assume the src dom structure and destination dom structure are identical (ie: cloneNode was used)

//   // window.getComputedStyle vs document.defaultView.getComputedStyle
//   // @TBD: also check for compatibility on IE/Edge
//   destination.style.cssText = document.defaultView.getComputedStyle(src, "").cssText;

//   if (recursively) {
//       var vSrcElements = src.getElementsByTagName("*");
//       var vDstElements = destination.getElementsByTagName("*");

//       for (var i = vSrcElements.length; i--;) {
//           var vSrcElement = vSrcElements[i];
//           var vDstElement = vDstElements[i];
//           console.log(i + " >> " + vSrcElement + " :: " + vDstElement, " :: ",vSrcElement.style);
//           vDstElement.style = document.defaultView.getComputedStyle(vSrcElement, "");
//       }
//   }
// }

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

const saveUpdatedQuestionFetch = async (questions) => {
  console.log(questions, "questions 23456");

  try {
    const response = await fetch("http://localhost:3000/questions", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(questions),
    });

    if (!response.ok) {
      throw new Error(`Ошибка HTTP! Статус: ${response.status}`);
    }
    const data = await response.json();
    // return data;
    console.log(data, "Ответ сервера");
  } catch (e) {
    console.log(e); // Исправлена опечатка
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
        nextButt.remove();
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

    };
    const nextButt = document.createElement("button");
    nextButt.textContent = "следующий вопрос";
    nextButt.classList.add("next-question");
    
    const prevButt = document.createElement("button");
    prevButt.textContent = "назад";
    prevButt.classList.add("prev-butt");
    
    prevButt.addEventListener("click", () => {
      if (indexQuestion > 1) {
        indexQuestion -= 2; 
        loadQuestion(); 
      }
    });

    nextButt.addEventListener("click", loadQuestion);
    loadQuestion();
    
    mainPage.appendChild(prevButt);
    mainPage.appendChild(nextButt);
    mainPage.appendChild(container);
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

    const backButton = document.createElement("button");
    backButton.classList.add("back-button");
    backButton.innerHTML = "back";

    const questions = await getQuestionsFetch();
    renderQuestions(questions, container, saveNewValueButton, backButton);
  }
});

const renderQuestions = (
  questions,
  container,
  saveNewValueButton,
  backButton
) => {
  container.innerHTML = "";

  saveNewValueButton.addEventListener("click", async (event) => {
    console.log("click");
    // questions[0].answers.map((item) => {
    //   console.log(item);
    // });
    await saveUpdatedQuestionFetch(questions);
    renderQuestions(questions, container, saveNewValueButton);
  });

  // backButton.addEventListener("click", (event) => {

  // });
  backButton.addEventListener("click", (event) => {
    // Восстановление состояния, например, сброс отображения элементов
    container.innerHTML = ""; // Сбросить весь контент внутри контейнера

    // Перерисовать начальный контент или вернуться к первоначальному состоянию
    renderQuestions(questions, container, saveNewValueButton, backButton);

    // Прокрутка контейнера в начальную позицию
    container.scrollTo(0, 0);
  });

  const wrapperButton = document.createElement("div");
  wrapperButton.classList.add("wrap-btn");
  wrapperButton.appendChild(backButton);
  wrapperButton.appendChild(saveNewValueButton);
  // const prev = container.cloneNode(true);
  questions.map((question) => {
    /*контейнер для вопроса с ответами*/
    const wrapperDiv = document.createElement("div");
    wrapperDiv.classList.add("custom-dropdown");

    /*контейнер для вопросов */
    const divListAnswers = document.createElement("div");
    divListAnswers.classList.add("div-list");

    /*кнопка показать/спрятать вопрос*/
    const toggelBtn = document.createElement("button");
    toggelBtn.innerHTML = question.question;

    /*редактировать вопрос*/
    const inputForQuestionEditing = document.createElement("input");
    inputForQuestionEditing.classList.add("question");
    inputForQuestionEditing.value = question.question;
    inputForQuestionEditing.addEventListener("input", (e) => {
      question.question = e.target.value;
    });

    toggelBtn.classList.add("toggle-btn");
    toggelBtn.addEventListener("click", (e) => {
      toggelBtn.innerHTML = "";
      // if (
      //   divListAnswers.style.display === "none" ||
      //   divListAnswers.style.display === ""
      // ) {
      //   divListAnswers.style.display = "block"; // Показать ответы
      // } else {
      //   divListAnswers.style.display = "none"; // Скрыть ответы
      // }

      divListAnswers.style.display =
        divListAnswers.style.display === "none" ||
        divListAnswers.style.display === ""
          ? "block"
          : "none";
    });
    // divListAnswers.classList.toggle("hidden");

    /*код для добавления нового вопроса*/
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
    divListAnswers.appendChild(inputForQuestionEditing);

    /*тут заканчивается код для добавления нового вопроса*/

    renderAnswers(
      question.answers,
      divListAnswers,
      question._id,
      inputForQuestionEditing
    );

    // toggelBtn.addEventListener("click", (event) => {
    //   divListAnswers.style.display === "none"
    //     ? (divListAnswers.style.display = "block")
    //     : (divListAnswers.style.display = "none");
    // });

    container.appendChild(wrapperDiv);
    wrapperDiv.appendChild(toggelBtn);

    wrapperDiv.appendChild(divListAnswers);
    // container.appendChild(saveNewValueButton);
    // wrapperDiv.appendChild(inputForQuestionEditing);
  });

  // container.appendChild(backButton);
  // container.appendChild(saveNewValueButton);
  container.appendChild(wrapperButton);

  // const copyElementAsHTML = (element) => {
  //   const computedStyle = window.getComputedStyle(element);
  //   // const newElement = document.createElement("div");
  //   // newElement.innerHTML = element.innerHTML;
  //     let prev = container.cloneNode(true);

  //   for (let key of computedStyle) {
  //     prev.style[key] = computedStyle.getPropertyValue(key);
  //   }
  //   return prev;
  // };

  // backButton.addEventListener("click", (event) => {
  //   // const copiedElement = copyElementAsHTML(container);
  //   // container.appendChild(copiedElement);
  //   // container.parentNode.replaceChild(prev, container); // Replaces the original container with the clone
  //   // divListAnswers.style.display === "none";
  // });
};

const renderAnswers = (
  answers,
  divListAnswers,
  questionId,
  inputForQuestionEditing
) => {
  divListAnswers.innerHTML = "";
  divListAnswers.appendChild(inputForQuestionEditing);
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
      // renderAnswers(updatedQuestion.answers, divListAnswers, questionId);

    });

    wrapperForOneAnswer.appendChild(checkBox);
    wrapperForOneAnswer.appendChild(removeAnswerBtn);
    wrapperForOneAnswer.appendChild(newAnswerInput);
    wrapperForOneAnswer.appendChild(saveNewAnswerBtn);

    divListAnswers.appendChild(wrapperForOneAnswer);
  });
  divListAnswers.appendChild(addNewAnswerBtn);

  answers.map((item) => {
    const wrapperForOneAnswer = document.createElement("div");
    wrapperForOneAnswer.classList.add("input-wrapper");

    const answer = document.createElement("input");
    answer.type = "text";
    answer.value = item.text;
    let newInputValue = "";
    answer.addEventListener("input", (e) => {
      // console.log(`Updated answer text: ${e.target.value}`);
      item.text = e.target.value;
    });

    const checkBox = document.createElement("input");
    checkBox.type = "checkbox";
    // checkBox.checked = item.isSelected || false; // Assuming `item.isSelected` holds the checkbox state
    let newCheckBoxValue = false;
    checkBox.addEventListener("change", (e) => {
      // console.log(`Checkbox state changed: ${e.target.checked}`);
      item.isCorrect = e.target.checked;
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
    // saveNewValueButton.addEventListener("click", async (e) => {
    //   const data = await getQuestionsFetch();
    //   console.log(data);
    //   const quest = data.find((q) => q._id === questionId);
    //   console.log("Savee", newInputValue, newCheckBoxValue, quest);
    // });

    wrapperForOneAnswer.appendChild(checkBox);
    wrapperForOneAnswer.appendChild(removeAnswerBtn);
    wrapperForOneAnswer.appendChild(answer);
    divListAnswers.appendChild(wrapperForOneAnswer);
    // divListAnswers.appendChild(saveNewValueButton);
  });
  // console.log("lalala", newCheckBoxValue);
};
