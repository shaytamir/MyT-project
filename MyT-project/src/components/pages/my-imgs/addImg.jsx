import React, { Component } from "react";
import { connect } from "react-redux";
import {
  addImg,
  uploadUserImg,
  imgCounterInc,
} from "../../../store/userImg/userImgActions";
//
import { changeProfileImg } from "../../../store/userImg/userImgActions";

class AddImg extends Component {
  state = {
    img_value: "/imgs/icons/user_icon.png",
    targetImg: "",
  };
  handleImg(e) {
    this.setState({
      img_value: URL.createObjectURL(e.target.files[0]),
      targetImg: e.target.files[0],
    });
  }

  /* upload img mathod */
  async uploadImage(user, imgs) {
    const myImgs = imgs.filter((img) => {
      return img.user_id === user._id;
    });
    console.log(myImgs);
    console.log(this.state.targetImg);
    let imgCount = user.imgCounter + 1;
    console.log(imgCount);
    console.log(111);
    const imageFormObj = new FormData();
    imageFormObj.append("imageName", "multer-image-" + Date.now());
    imageFormObj.append("imageData", this.state.targetImg);
    imageFormObj.append("imageCount", imgCount);
    imageFormObj.append("bool", imgCount === 1 ? true : false);

    try {
      await this.props.addImg(
        imageFormObj,
        this.state.img_value,
        user._id,
        imgCount
      );
      await this.props.uploadUserImg(user);
      /* increment img counter */

      await this.props.imgCounterInc(user);
      if (!myImgs.length) {
        /* if first img, make profile img */
        console.log("first time img");
        // if (myImgs.length > 0) {
          const imgId = `${user._id}-${imgCount}`;
          await this.props.changeProfileImg(imgId, user._id);
        // }
      }
    } catch (err) {
      console.error("error upload image");
    }
    this.setState({
      targetImg: "",
      img_value: "/imgs/icons/user_icon.png",
    });
    this.fileInput.value = "";
  }

  render() {
    const { targetImg } = this.state;
    const { user, imgs } = this.props.data;
    return (
      <div>
        <div className="image_container">
          <p className="procces_details">Upload image here</p>
          <div className="process">
            <input
              ref={(el) => {
                this.fileInput = el;
              }}
              type="file"
              className="process_upload-btn"
              onInput={(e) => this.handleImg(e, "multer", user)}
            />
            <img
              src={this.state.img_value}
              alt="upload"
              className="process_image"
            />
          </div>
          {targetImg && (
            <div className="img_btn_div">
              <button
                className="img_btn"
                type="button"
                onClick={(e) => {
                  this.uploadImage(user, imgs, e);
                }}
              >
                Set Image
              </button>
            </div>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    data: state.data,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addImg: (img, urlImg, userId, imgCount) =>
      dispatch(addImg(img, urlImg, userId, imgCount)),
    uploadUserImg: (user) => dispatch(uploadUserImg(user)),
    changeProfileImg: (imgId, userId) =>
      dispatch(changeProfileImg(imgId, userId)),
    imgCounterInc: (user) => dispatch(imgCounterInc(user)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(AddImg);
