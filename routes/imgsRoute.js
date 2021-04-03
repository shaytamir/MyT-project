// const { required, func, string } = require("@hapi/joi");

const route = require("express").Router();
const multer = require("multer");
const auth = require("../middleware/auth");
const path = require("path");

const AWS = require("aws-sdk");
const multerS3 = require("multer-s3");

const Img = require("../models/img");
const { User } = require("../models/user");

const config = require("config");
const s3_accessKeyId = config.get("s3_accessKeyId");
const s3_secretAccessKey = config.get("s3_secretAccessKey");
const s3_bucket = config.get("s3_bucket");

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, "./MyT-project/build/imgs/users/uploads");
//   },
//   filename: function (req, file, cb) {
//     cb(null, Date.now() + file.originalname);
//   },
// });
// const fileFilter = (req, file, cb) => {
//   if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
//     /* file exepted */
//     cb(null, true);
//   } else {
//     /* rejected storing file */
//     cb(null, false);
//   }
// };

// const upload = multer({
//   storage: storage,
//   limits: {
//     fileSize: 1024 * 1024 * 5,
//   },
//   fileFilter: fileFilter, 
// });


route.use(function (req, res, next) {
  console.log("'Request URL':: ", req.originalUrl);
  next();
});




const s3 = new AWS.S3({
  accessKeyId: s3_accessKeyId,
  secretAccessKey: s3_secretAccessKey,
  Bucket: s3_bucket,
  region: "eu-central-1",
});

const uploadS3 = multer({
  storage: multerS3({
    s3: s3,
    bucket: s3_bucket,
    acl: "public-read",
    contentType: multerS3.AUTO_CONTENT_TYPE,

    metadata: function (req, file, cb) {
      cb(null, Object.assign({}, req.body));
    },
    key: function (req, file, cb) {
      console.log("aaa", req.body);
      const id = req.user._id;
      // const album = req.body.album_name;
      // cb(null, file.originalname + "-" + new Date().toISOString() + "-" + uuidv4())//
      // console.log(req.headers);
      cb(
        null,
        "MyT/users/" + id + "/"  + Date.now() + "-" + file.originalname
      );
    },
  }),
  // SET DEFAULT FILE SIZE UPLOAD LIMIT
  limits: { fileSize: 1024 * 1024 * 10 }, // 50MB
  // FILTER OPTIONS LIKE VALIDATING FILE EXTENSION
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  },
});
const checkFileType = (file, cb) => {
  const filetypes = /jpeg|jpg|png|gif/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);

  if (mimetype && extname) {
    console.log("*** its imagesss");
    return cb(null, true);
  } else {
    cb("Error: Images Only!");
  }
};

/* storage img */
route
  .route("/uploadmulter")
  .post(auth, uploadS3.single("imageData"),  (req, res, next) => {
      console.log("body",req.body);
            console.log("files",req.file);

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
