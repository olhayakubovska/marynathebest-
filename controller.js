import Answer from "./model/Answers.js";
import Question from "./model/Question.js";

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
export { getQuestions, addQuestion, getAnswers };
