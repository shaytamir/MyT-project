import React, { Component } from "react";
import { connect } from "react-redux";
import { imgUrl,s3_imgUrl } from "../../../config.json";
import {
  inimgEditMOde,
  outimgEditMOde,
  changeProfileImg,
  DELeteImg,
} from "../../../store/userImg/userImgActions";
import { swalConfitm } from "../../../services/utils";

class Img extends Component {
  state = {};

  checkImgSource(img, user) {
    if (img.imageData.includes("blob")) {
      return img.imageData;
    }
    return ּimg.imageData;
  }

  async clearEditMode(imgs) {
    /* finds and clears img in-edit-mode */
    let prevImg = imgs.find((i) => {
      return i.inEditMode === true;
    });
    if (prevImg) await this.props.outimgEditMOde(prevImg.id);
  }

  async handleImgClick(imgs, img) {
    await this.clearEditMode(imgs);
    await this.props.inimgEditMOde(img.id);
  }

  async handleFullScreen(i, imgs) {
    await this.clearEditMode(imgs);
    await this.props.openBigImg(true, i);
  }
  async setProfileImg(imgs, img) {
    await this.clearEditMode(imgs);
    await this.props.changeProfileImg(img.id, img.user_id);
  }

  /* DELETE img */
  async handleImgDELETE(img) {
    console.log(img);
    const prompt = await swalConfitm();
    if (prompt) {
      this.props.DELeteImg(img.id);
    }
  }

  render() {
    const { img, i } = this.props;
    const { user, imgs } = this.props.data;
    const imgSrc = this.checkImgSource(img, user);
    console.log(imgSrc);

    return (
      <div className="img_div">
        <div className={`img_item ${img.isProfileImg ? "profile_item" : null}`}>
          <img
            className="thisImg"
            src={imgSrc}
            alt=""
            onClick={() => {
              this.handleImgClick(imgs, img);
            }}
          />
          {/* on Edit img mode */}
          {img.inEditMode && (
            <React.Fragment>
              <div
                className="delete_img_btn"
                onClick={() => {
                  this.handleImgDELETE(img);
                }}
              >
                {!img.isProfileImg && <img src="/imgs/icons/x.png" alt="" />}
              </div>
              <div className="edit_mode">
                <div>
                  <button
                    className="btn btn-primary full_screen_btn"
                    onClick={() => {
                      this.handleFullScreen(i, imgs);
                    }}
                  >
                    full-screen
                  </button>
                </div>
                <div>
                  {/* if not profile img */}
                  {!img.isProfileImg && (
                    <button
                      className="btn btn-success profile_img_btn"
                      onClick={() => {
                        this.setProfileImg(imgs, img);
                      }}
                    >
                      set profile image
                    </button>
                  )}
                  {/* if  profile img */}
                  {img.isProfileImg && (
                    <button
                      className="btn btn-success profile_img"
                      onClick={() => {
                        this.setProfileImg(imgs, img);
                      }}
                    >
                      profile image
                    </button>
                  )}
                </div>
              </div>
            </React.Fragment>
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
    inimgEditMOde: (imgId) => dispatch(inimgEditMOde(imgId)),
    outimgEditMOde: (imgId) => dispatch(outimgEditMOde(imgId)),
    changeProfileImg: (imgId, userId) =>
      dispatch(changeProfileImg(imgId, userId)),
    DELeteImg: (imgId) => dispatch(DELeteImg(imgId)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Img);
