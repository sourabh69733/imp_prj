const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
    },
    description: { type: String, required: false },
    profilePicture: { type: URL, required: false },
    scores: { type: URL, required: false },
    date: { type: Date, required: true },
  },
  {
    timestamps: true,
  }
);

const questionSchema = new Schema({
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
    type: URL,
    required: false,
  },
});

const tutorialSchema = Schema({

  links:{
    type:URL,
    required:true,
    weekId:{
      type:String,
      required: true,
      lessonId:{
        type:String,
        required: true,
      }

    }
  }
})
const User = mongoose.model("User", userSchema);
const Question = moongoose.model("Question", questionSchema);
const Tutorials = moongoose.model("Tutorials", tutorialSchema);
module.exports = User;
module.exports = Question;
module.exports = Tutorials;