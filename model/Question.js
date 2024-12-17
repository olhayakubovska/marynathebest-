import mongoose from "mongoose";
// import { Schema } from "mongoose";

const answersSchema = mongoose.Schema({
  id: {
    type: String,
  },
  text: {
    type: String,
    required: true,
  },
  isCorrect: {
    type: Boolean,
    required: true,
  },
});

const questionSchema = mongoose.Schema({
  question: {
    type: String,
    required: true,
  },
  answers: [answersSchema],
});

const Question = mongoose.model("Question", questionSchema);

export default Question;
