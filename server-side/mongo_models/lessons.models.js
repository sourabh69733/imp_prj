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
    lessonId: {
      type: String,
      required: true,
    },

    courseId:{
      type:String,
      required: true,
    },
    links: {
      type: String,
      required: true,
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
        default:0,
      },
      required: false,
    },
    feedback: {
      type: String,
      required: false,
    },
    is_popup:{
      type:Boolean,
      required: false,
      default:false,
    }
  },
  {
    timestamps: true,
  }
);

const lessonFeatures = Schema(
  {
    lessonId: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);
const User = mongoose.model("User", userSchema);
const Tutorials = mongoose.model("Tutorials", tutorialSchema);
const LessonFeatures = mongoose.model("lessonFeatures", lessonFeatures);
module.exports = { User, LessonFeatures, Tutorials };
// module.exports = LessonFeatures;
// module.exports = Tutorials;
