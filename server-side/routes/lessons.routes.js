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
    .then((lessons) => res.json(lessons))
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
  
  const lessonId = req.body.lessonId;
  const links = req.body.links;
  const description = req.body.description;
  const is_popup = req.body.is_popup;

  const lessons = new models.Tutorials({
    lessonId,
    links,
    description,
    is_popup,
  });

  lessons
    .save()
    .then(() => res.status(200).json({msg:"added!"}))
    .catch((err) => console.log(err));

  // next();
});

router.route("/delete/:id").delete((req,res,next) =>{
  models.findByIdAndDelete(req.params.id).then(() => res.json({msg:"deleted successfully "+req.params.id}))
  .catch((err) => res.json({msg:"try after some time or perhaps id not exit or router path add / or delete /"}));
  next();
});
router.route("/update/:id").post((req,res,next) => {
  const id = req.body.lessonId;
  const links = req.body.links;
  const description = req.body.description;
  const is_popup = req.body.is_popup;
  models.Tutorials.findById(req.params.id)
  .then((feature) =>{
    if (id) feature.lessonId = id;
    if (links) feature.links = links;
    if (description) feature.description = description;    
    if (is_popup) feature.is_popup = is_popup;

    feature.save();

    return res.json({ msg: "added successfully" });

  } )
  .catch((err) => res.status(400).json({succuss:false, msg:"there are errors, try again"+err}));

  // return res.json({ msg: "success" });
})

module.exports = router;

