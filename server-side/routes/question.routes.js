const router = require('express').Router();
const models = require("../mongo_models/question.models");


router.route("/").get((req,res,next) => {
    models.Question.find()
    .then((ques) => res.json({ question: ques }))
    .catch((err) => res.json({ err: "there is err internally sorry " + err }));
})

router.route("/:id").get((req,res,next) => {
  models.Question.findById(req.params.id)
  .then((ques) => {
    res.json({question:ques})
  })
  .catch((err) => res.json({err:"there is error in data fetching "+err}));
});

router.post("/add", (req,res,next) => {
     
    const  questionId     =   req.body.questionId;
    const  questionType   =   req.body.questionType;
    const question        =   req.body.question;
    const  options        =   req.body.options;
    const  answer         =   req.body.answer;
    const  description    =   req.body.description;
    const  tutorialLink   =   req.body.tutorialLink;

    const question_data = new models.Question({
      questionId,
      questionType,
      question,
      options,
      answer,
      description,
      tutorialLink,
    });

    question_data
    .save()
    .then((data) =>
    {
      res.json({succuss:true,msg:"Successfully data Uploaded"}
      )
    })
    .catch(err => res.status(400).json({succuss:false,msg:err}))
    
})

router.route("/update/:id").post((req,res,next) => {
  models.Question.findById(req.params.id)
  .then((ques) => {
    if (req.body.questionType)
    ques.questionType = req.body.questionType;
    if (req.body.question)
    ques.question = req.body.question;
    if (req.body.options)
    ques.options = req.body.options;
    if (req.body.answers)
    ques.answers = req.body.answers;
    if (req.body.description)
    ques.description = req.body.description;
    if (req.body.tutorialLink)
    ques.tutorialLink= req.body.tutorialLink;
  })
  .catch((err) => res.json(({err:"there is error "+err})))
  return res.json({msg:"question updated successfully"})
})
module.exports = router;
