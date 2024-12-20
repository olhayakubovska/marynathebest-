import Answer from "./model/Answers.js";
import Question from "./model/Question.js";
// import mongoose from "mongoose";
// const mongoose = require("mongoose");
// import mongoose from "mongoose";

async function getQuestions(req, res) {
  const questions = await Question.find();
  // console.log(questions, "questions from db˝");
  res.json(questions);
}

async function addAnswerFromUser(newAnswer) {
  await Answer.create(newAnswer);
}

async function getAnswers(req, res) {
  const answers = await Answer.find();
  res.json(answers);
}

async function addNewAnswer(idQuestion, newAnswer) {
  try {
    await Question.findOneAndUpdate(
      { _id: idQuestion },
      { $push: { answers: newAnswer } },
      // { new: true }
    );

    const questions = await Question.find();
    // console.log(questions, "questionsFromDB");
    return questions;
  } catch (e) {
    console.log(e);
  }
}

async function deleteAnswer(questionId, answerId) {
  try {
    await Question.updateOne(
      { _id: questionId },
      { $pull: { answers: { _id: answerId } } }
    );

    // console.log(result, "Результат удаления");

    // // Проверяем, был ли документ найден и обновлен
    // if (result.matchedCount === 0) {
    //   return { success: false, message: "Вопрос не найден" };
    // }
    // if (result.modifiedCount === 0) {
    //   return {
    //     success: false,
    //     message: "Ответ не был удален, возможно его не существует",
    //   };
    // }

    // Получаем обновленные данные
    const questions = await Question.find();

    // console.log(questions, "Обновленные вопросы из MongoDB");

    return questions;
  } catch (error) {
    console.error("Ошибка при удалении ответа:", error);
    throw new Error("Ошибка при удалении ответа");
  }
}

export {
  getQuestions,
  addAnswerFromUser,
  getAnswers,
  addNewAnswer ,
  deleteAnswer,
};
