import mongoose from "mongoose";

const answerSchema = mongoose.Schema({
  questionId: {
    type: String,
    required: true,
  },
  answer: {
    type: Boolean,
    required: true,
  },
  currentTestId: {
    type: String,
    required: true,
  },
});

const Answer = mongoose.model("answers", answerSchema);
export default Answer;
