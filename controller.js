import Answer from "./model/Answers.js";
import Question from "./model/Question.js";
// import mongoose from "mongoose";

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
  // console.log(idQuestion, newAnswer, "controller Value");
  // s;
  const updatedQuestion = await Question.findOneAndUpdate(
    { _id: idQuestion },
    { $push: { answers: newAnswer } },
    { new: true }
  );
  // console.log(updatedQuestion, "updatedQuestionFroMongoDB");
  return updatedQuestion;
}

async function deleteAnswer(questionId, answerId) {
  const updateQuestions = await Question.updateOne(
    { _id: questionId },
    { $pull: { answers: { _id: answerId } } }
  );

  return updateQuestions;
}

export { getQuestions, addQuestion, getAnswers, updateValue, deleteAnswer };
