import React, { Component } from "react";
import { connect } from "react-redux";
import { imgUrl } from "../../../config.json";
import { changeProfileImg } from "../../../store/userImg/userImgActions";

class BigImg extends Component {
  state = {
    counter: 0,
  };
  componentDidMount() {
    const { index } = this.props;
    this.setState({ counter: index });
  }

  /* full screen imgs logic */
  baxt(action, myImgs) {
    let counter = this.state.counter;
    if (action === "back") {
      if (counter === 0) return this.setState({ counter: myImgs.length - 1 });
      return this.setState({ counter: --counter });
    }
    if (action === "next") {
      if (counter === myImgs.length - 1) return this.setState({ counter: 0 });
      return this.setState({ counter: ++counter });
    }
  }

  closeBigImg() {
    this.props.closeImgs(false);
  }
  async setProfileImg(img) {
    await this.props.changeProfileImg(img.id, img.user_id);
  }

  render() {
    const { myImgs } = this.props;
    /* if not refreshed, get imgs address from blob */
    /* if refreshed, get imgs address from server */
    let currentImg = `${myImgs[this.state.counter].imageData}`;
    const img = myImgs[this.state.counter];
    if (currentImg.includes("/blob")) {
      currentImg = myImgs[this.state.counter].imageData;
    } else {
      console.log(currentImg);
      currentImg = currentImg.slice(17);
      console.log(currentImg);
    }

    return (
      <div className="main_black">
        <div
          className="black_screen"
          onClick={() => {
            this.closeBigImg();
          }}
        >
          <div className="x btn">x</div>
        </div>
        <div className="imd_div">
          <div
            className=" back"
            onClick={() => {
              this.baxt("back", myImgs);
            }}
          >
            <div className="btn"> &lt;</div>
          </div>
          <div className="big_img">
            {/* big-img */}
            <img src={currentImg} alt="" />
            {/* set profile img */}
            {!img.isProfileImg && (
              <div
                className="btn btn-primary"
                onClick={() => {
                  this.setProfileImg(img);
                }}
              >
                Set Profile Image
              </div>
            )}
            {/* make profile img */}
            {img.isProfileImg && (
              <div className="btn btn-success">Profile Image</div>
            )}
          </div>
          <div
            className=" next"
            onClick={() => {
              this.baxt("next", myImgs);
            }}
          >
            <div className="btn">&gt;</div>
          </div>
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
    changeProfileImg: (imgId, userId) =>
      dispatch(changeProfileImg(imgId, userId)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(BigImg);
