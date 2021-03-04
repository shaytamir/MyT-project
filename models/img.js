const mongoose = require("mongoose");

const ImageSchema = new mongoose.Schema({
  imageName: {
    type: String,
    default: "none",
    required: true,
  },
  imageData: {
    type: String,
    required: true,
  },
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
  id: {
    type: String,
    unique: true,
  },
  isProfileImg: {
    type: Boolean,
    // default: false,
  },
  inEditMode: {
    type: Boolean,
    default: false,
  },
});
const Img = mongoose.model("Img", ImageSchema);
module.exports = Img;
