const router = require('router');
const {Question} = require("../mongo_models/mongo_models")

router.get("/", (req,res,next) => {
    if (req.isAuthenticated())
    res.status(200).json({succuss:true})
    else 
    res.status(200).json({succuss:false})
    next();
})

router.post("/questions", (req,res,next) => {
    if (!req.isAuthenticated){
        res.status(401).json({succuss:false, msg:"You are not authorised for this route"});
        next();
    }
    
    Question.findById(req.body.question.questionId).then((data) =>
    {
      res.json(
        (questionId = data.questionId),
        (question = data.array),
        (options = data.options),
        (answer = data.answer),
        (description = data.description),
        (tutorialLink = data.tutorialLink)
      )
    })
    .catch(err => res.status(400).json({succuss:false,msg:err}))
      
})

