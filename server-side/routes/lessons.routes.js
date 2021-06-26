const router = require("express").Router();
const models = require("../mongo_models/lessons.models");
// const LessonFeatures = require("../mongo_models/lessons.models");


router.route("/:id").get((req, res,next) => {

  models.Tutorials.findById(req.params.id)
    .then((lessons) => res.json({ data: lessons }))
    .catch((err) => console.log(err));
});

router.route("/").get((req,res,next) =>{
  models.Tutorials.find()
    .then((less) => res.json({ success: true, lessons: less }))
    .catch((err) => res.json({ err: err }));
});


router.route("/feedback/:id").post((req,res,next) => {

    models.Tutorials.findById(req.params.id)
      .then((feature) => {
        feature.feedback=req.body.feedback
       feature.save();
       return res.json({msg:"feedback uploaded success"});

      })
      .catch((err) => console.log(err));
    next();
})

router.post("/votecount/:id", (req, res, next) => {

    models.Tutorials.findById(req.params.id)
      .then((feature) => {
        feature.voteCount.downvote = req.body.downvote;
        feature.voteCount.upvote = req.body.upvote;

        feature.save();
        return res.json({
          success: true,
          msg: "upvote updated " + feature.voteCount + " ",
        });
      })
      .catch((err) => res.json({ succuss: false, msg: String(err) }));  
    next();
});

router.route("/add").post((req, res, next) => {
  
  const lessonId = req.body.lesson_id;
  const links = req.body.links;
  const description = req.body.description;
  const is_popup = req.body.is_popup;
  if (models.Tutorials.filter((item) => item.lessonId==lessonId))
  return res.json({
    success: false,
    msg: "This Id is not valid either through schema and exist already. It must be unique and descriptive to video",
  });
  const lessons = new models.Tutorials({
    lessonId,
    links,
    description,
    is_popup,
  });

  lessons
    .save()
    .then(() => res.json({ success: false, msg: "Lesson added succussfully!" }))
    .catch((err) => console.log(err));

  next();
});

router.route("/delete/:id").delete((req,res,next) =>{
  models.findByIdAndDelete(req.params.id).then(() => res.json({msg:"deleted successfully "+req.params.id}))
  .catch((err) => res.json({msg:"try after some time or perhaps id not exit or router path add / or delete /"}));
  next();
});

router.route("/update/:id").post((req,res,next) => {
  const links = req.body.links;
  const description = req.body.description;
  const is_popup = req.body.is_popup;
  models.Tutorials.findById(req.param.id)
  .then((feature) =>{
    if (req.body.links) feature.links = links;
    if (req.body.description) feature.description = description;    
    if (req.body.is_popup) feature.is_popup = is_popup;

    feature.save()
    return res.json({ msg: "success " });

  } )
  .catch((err) => res.status(400).json({succuss:false, msg:"there are errors, try again"+err}))
  next();
  return res.json({ msg: "not success" });
})

router.route("/lessonId_update/:id").post((req,res ,next) => {
  
})
module.exports = router;



