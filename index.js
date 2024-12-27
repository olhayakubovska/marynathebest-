// const express = require("express");
// const mongoose = require("mongoose");
// // const Question = require("./model/Question");
// const getQuestions = require("./controller");
// const app = express();
// const port = 3000;

// app.set("view engine", "ejs");

// // Указываем папку, где будут храниться ваши шаблоны
// app.set("views", "views");
// app.use(express.json()); // Обработка тела запроса в формате JSON
// app.use(express.static("public"));

// app.get("/", async (req, res) => {
//   const questions = await getQuestions();
//   console.log(questions, "questions");
//   res.render("index", {
//     title: "hello world",
//     questions: questions,
//   });
// });

// mongoose
//   .connect(
//     "mongodb+srv://oyakubovska:qwerty123@cluster0.abt5c.mongodb.net/questions?retryWrites=true&w=majority&appName=Cluster0"
//   )
//   .then(() => {
//     app.listen(port, () => {
//       console.log(`Сервер запущен на http://localhost:${port}`);
//     });
//   });

import express from "express";
import mongoose from "mongoose";
import {
  addAnswerFromUser,
  addNewAnswer,
  deleteAnswer,
  getAnswers,
  getQuestions,
  saveUpdatedQuestions,
} from "./controller.js"; // Импортируем функцию через ES Modules

const app = express();
const port = 3000;

app.set("view engine", "ejs");
app.set("views", "views");
app.use(express.json());
app.use(express.static("public"));

app.get("/", async (req, res) => {
  // const questions = await getQuestions();
  // console.log(questions, "questions");
  res.render("index", {
    title: "Quiz",
    // questions: questions,
  });
});
app.get("/questions", getQuestions);

app.delete("/questions/:id", async (req, res) => {
  const questionId = req.params.id;
  const answerId = req.query.answerId;
  const questions = await deleteAnswer(questionId, answerId);

  res.json(questions);
});

app.post("/questions/:id", async (req, res) => {
  const { id } = req.params;

  const body = req.body;
  console.log(id, body, "express");
  const questions = await addNewAnswer(id, body);
  res.json(questions);
});

app.get("/answers", getAnswers);

app.post("/answersfromuser", async (req, res) => {
  await addAnswerFromUser(req.body);
});

app.put("/questions", async (req, res) => {
  const questions = req.body;
  console.log(questions, "questions from fetch");
  await saveUpdatedQuestions(questions);
});

mongoose
  .connect(
    "mongodb+srv://oyakubovska:qwerty123@cluster0.abt5c.mongodb.net/questions?retryWrites=true&w=majority&appName=Cluster0"
  )
  .then(() => {
    app.listen(port, () => {
      console.log(`Сервер запущен на http://localhost:${port}`);
    });
  });
