const router = require('express').Router();
const {Question} = require("../mongo_models/question.models")

router.get("/auth-user", (req,res,next) => {
    if (req.isAuthenticated())
    res.status(200).json({succuss:true})
    else 
    res.status(200).json({succuss:false})
    next();
})

router.post("/", (req,res,next) => {
    
    const question_data = {
      questionId: res.body.questionId,
      question: res.body.array,
      options: res.body.options,
      answer: res.body.answer,
      description: res.body.description,
      tutorialLink: res.body.tutorialLink,
    };
    Question(question_data)
    .save()
    .then((data) =>
    {
      res.json({succuss:true,msg:"Successfully data Uploaded"}
      )
    })
    .catch(err => res.status(400).json({succuss:false,msg:err}))
      
})

module.exports = router;
