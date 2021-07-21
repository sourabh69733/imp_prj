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

router.route("/admin/coursecount").get((req,res,next) => {

  models.CourseFeatures.findById("60ef2505401693328c169f97")
    .then((week_count) => res.json(week_count))
    .catch((err) => console.log(err));
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
  const courseId = req.body.courseId;
  const lessonName = req.body.lessonName;
  const weekName = req.body.weekName;
  const courseWeekCount = parseInt(req.body.weekNumber);
  const courseLessonCount = parseInt(req.body.lessonNumber);

  const lessons = new models.Tutorials({
    lessonId,
    links,
    description,
    is_popup,
    courseId,
    lessonName,
    weekName,
  });

  lessons
    .save()
    .then(() => res.status(200).json({msg:"added!"}))
    .catch((err) => console.log(err));

  /**
   * only reqirement for storing number of courses values in database, 
   */
  models.CourseFeatures.findById("60ef2505401693328c169f97")
    .then((feature) => {
      (feature.courseLessonCount = courseLessonCount),
        (feature.courseWeekCount = courseWeekCount);

      feature.save();
    })
    .catch((err) =>
      console.log(err)
    );

});

router.route("/delete/:id").delete((req,res,next) =>{
  models
    .Tutorials.findByIdAndDelete(req.params.id)
    .then(() => res.json({ msg: "deleted successfully " + req.params.id }))
    .catch((err) =>
      res.json({
        msg: "try after some time or perhaps id not exit or router path add / or delete /",
      })
    );
  next();
});

// C:\\Users\gaurav sahu\Desktop\mysql_pass.txt
router.route("/delete").delete((req,response,next) => {
  models.Tutorials.deleteMany()
    .then((res) => response.json(res))
    .catch((err) => console.log(err));
    models.CourseFeatures.findById("60ef2505401693328c169f97")
      .then((feature) => {
        (feature.courseLessonCount = 1),
          (feature.courseWeekCount = 1);

        feature.save();
      })
      .catch((err) => console.log(err));

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

})

module.exports = router;

/***
 *   models.CourseFeatures.findById("60edddd485514b323c6c5d95")
  .then((feature) =>{
      feature.courseWeekCount =   courseWeekCount,
      feature.courseLessonCount = courseLessonCount;
      feature.save();
      return res.json({msg:"added"})
  })
  .catch((err) => console.log(err));

 */

