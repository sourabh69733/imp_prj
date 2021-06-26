const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const questionSchema = new Schema(
  {
    questionId: {
      type: String, // ex. wk1_ls1 --lesson 1 for week 1
      required: true,
    },
    question: {
      type: String,
      required: true,
    },
    options: {
      type: Array,
      required: true,
    },
    answer: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: false,
      default: null,
      date: { type: Date, required: false },
    },
    tutorialLink: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

const Question = mongoose.model("Question", questionSchema);
module.exports = Question;
