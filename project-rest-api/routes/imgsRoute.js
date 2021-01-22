const { required, func, string } = require("@hapi/joi");

const route = require("express").Router();
const Img = require("../models/img");
const multer = require("multer");
const auth = require("../middleware/auth");
const { User } = require("../models/User");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/img/uploads");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname);
  },
});
const fileFilter = (req, file, cb) => {
  if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
    /* file exepted */
    cb(null, true);
  } else {
    /* rejected storing file */
    cb(null, false);
  }
};

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5,
  },
  fileFilter: fileFilter,
});

/* storage img */
route
  .route("/uploadmulter")
  .post(upload.single("imageData"), auth, (req, res, next) => {
    const newImg = new Img({
      imageName: req.body.imageName,
      imageData: req.file.path,
      user_id: req.user._id,
      id: `${req.user._id}-${req.body.imageCount}`,
      isProfileImg: req.body.bool,
    });

    newImg
      .save()
      .then((result) => {
        console.log(result);
        res.status(200).json({
          success: true,
          document: result,
        });
        // .send(result);
      })
      .catch((err) => next(err));
  });

/* get all imgs */
route.get("/get-images", auth, async (req, res) => {
  try {
    const imgs = await Img.find();
    res.send(imgs).status(200);
  } catch (err) {
    console.log("cent get images");
    res.send(err).status(400);
  }
});

/* falsey profile img */
route.patch("/false-current-profile-img", auth, async (req, res) => {
  const profileImg = await Img.findOne({
    user_id: req.user._id,
    isProfileImg: true,
  });
  if (!profileImg) {
    console.log("no profile Img");
    res.send(err).status(404);
  }
  console.log("profile Img", profileImg);
  profileImg.isProfileImg = false;
  console.log("profile Img", profileImg);

  try {
    await profileImg.save();
    res.send(profileImg).status(200);
  } catch (err) {
    console.log("cent get images", err);
    res.send(err).status(400);
  }
});

/* change profile img */
route.patch("/change-profile-img/:id", auth, async (req, res) => {
  const myImg = await Img.findOne({ id: req.params.id });
  if (!myImg) {
    console.error("no img");
    res.send(err).status(404);
  }
  myImg.isProfileImg = true;
  try {
    await myImg.save();
    res.send(myImg).status(200);
  } catch (err) {
    console.log("cent get images", err);
    res.send(err).status(400);
  }
});

/* set profile img to user*/
route.patch("/set-user-profile-img/:id", auth, async (req, res) => {
  const user = await User.findById(req.user._id);
  if (!user) {
    console.error("no user found");
    res.send(err).status(404);
  }
  user.profile_img = req.params.id;

  try {
    await user.save();
    res.send(user).status(200);
  } catch (err) {
    console.log("cent get images", err);
    res.send(err).status(400);
  }
});

/* IMG COUNTER INCRECE*/
route.patch("/img-counter-inc/", auth, async (req, res) => {
  const user = await User.findById(req.user._id);
  if (!user) {
    console.error("no user found");
    res.send(err).status(404);
  }
  ++user.imgCounter;

  try {
    await user.save();
    res.send(user).status(200);
  } catch (err) {
    console.log("cent get images", err);
    res.send(err).status(400);
  }
});

/* DELETE img*/
route.delete("/delete/:id", auth, async (req, res) => {
  const img = await Img.findOneAndRemove({ id: req.params.id });
  if (!img) {
    console.error("no img found");
    res.send(err).status(404);
  }
  try {
    // await img.save();
    res.send("img").status(200);
  } catch (err) {
    console.log("cent get images", err);
    res.send(err).status(400);
  }
});

module.exports = route;
