const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
    },
    description: { type: String, required: false },
    profilePicture: { type: String, required: false },
    scores: { type: String, required: false },
    date: { type: Date, required: true },
  },
  {
    timestamps: true,
  }
);


const tutorialSchema = Schema(
  {
    // Automatic construction from lesson, week and course
    lessonId: {
      type: String, // wk1_ls1
      required: true,
    },

    courseId: {
      type: String,
      required: false,
    },
    //
    lessonName: {
      type: String,
      required: false,
    },
    weekName: {
      type: String,
      required: false,
    },
    links: {
      type: String,
      required: false,
    },
    description: {
      type: String,
      required: false,
    },
    voteCount: {
      upvote: {
        type: Number,
        required: false,
        default: 0,
      },
      downvote: {
        type: Number,
        required: false,
        default: 0,
      },
      required: false,
    },
    feedback: {
      type: String,
      required: false,
    },
    is_popup: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const courseFeatures = Schema(
  {
    courseId: {
      type: String,
      required: true,
    },
    courseWeekCount: {
      type: Number,
      required: false,
    },
    courseLessonCount: {
      type: Number,
      required: false,
    },
  },
);


const User = mongoose.model("User", userSchema);
const Tutorials = mongoose.model("Tutorials", tutorialSchema);
const CourseFeatures = mongoose.model("courseFeatures", courseFeatures);
module.exports = { User, CourseFeatures, Tutorials };
// module.exports = LessonFeatures;
// module.exports = Tutorials;
