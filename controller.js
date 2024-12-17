import Answer from "./model/Answers.js";
import Question from "./model/Question.js";
import mongoose from "mongoose";

async function getQuestions(req, res) {
  const questions = await Question.find();
  // console.log(questions, "questions from db˝");
  res.json(questions);
}

async function addQuestion(userAnswer) {
  // console.log(userAnswer,"userAnswerController")
  await Answer.create(userAnswer);
}

async function getAnswers(req, res) {
  const answers = await Answer.find();
  // console.log(questions, "questions from db˝");
  res.json(answers);
}

async function updateValue(idQuestion, newAnswer) {
  console.log(idQuestion, newAnswer, "controller Value");

  //   const questions = await Question.find();
  //  const updateQuestion = questions.map((question) => {
  //     question.id === idQuestion ? { ...question, body } : question;
  // //   });
  // const updatedQuestion = await Question.findOneAndUpdate(
  //   { id: idQuestion }, // Условие для поиска
  //   { $push: { answers: newAnswer } }, // Добавляем новый ответ в массив
  //   { new: true } // Вернуть обновленный документ
  // );
  const updatedQuestion = await Question.findOneAndUpdate(
    { _id: idQuestion}, 
    { $push: { answers: newAnswer }},
    { new: true }
  );
  console.log(updatedQuestion, "updatedQuestionFroMongoDB");
  return updatedQuestion;
}

export { getQuestions, addQuestion, getAnswers, updateValue };
