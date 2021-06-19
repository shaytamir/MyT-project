import React, { Component } from "react";
import { connect } from "react-redux";
import AddImg from "./addImg";
import Header from "../../common/header";
import Img from "./img";
import BigImg from "./bigImg";
import { Redirect } from "react-router-dom";
import { getCurrentUser } from "../../../services/userService";

class MyImgs extends Component {
  state = {
    bigImg: false,
    index: 0,
    sortPosts: "asc",
  };
  openBigImg(bool = true, i) {
    this.setState({ bigImg: bool, index: i });
  }
  sortChange(e) {
    this.setState({ sortPosts: e.target.value });
  }
  render() {
    const { imgs, user } = this.props.data;
    const { bigImg, sortPosts } = this.state;
    /* redirect  !user */
    let userLog = getCurrentUser();
    if (userLog === null) return <Redirect to="/" />;

    let myImgs = imgs.filter((img) => {
      return img.user_id === user._id;
    });
    myImgs = myImgs.reverse();
    console.log(myImgs.length);
    if (myImgs.length === 1) {
    }
    if (sortPosts === "desc") {
      myImgs = myImgs.reverse();
    }
    return (
      <React.Fragment>
        <div className="imgs_main">
          <Header title="My Images" />
          <hr />
          <div>
            <AddImg />
          </div>
          <hr />
          <div className="select_div">
            <select
              onChange={(e) => {
                this.sortChange(e);
              }}
            >
              <option value="asc">new to old</option>
              <option value="desc">old to new</option>
            </select>
          </div>
          <div className="imgs">
            {myImgs &&
              myImgs.length > 0 &&
              myImgs.map((img, i) => (
                <React.Fragment key={i}>
                  <Img
                    className="two"
                    img={img}
                    i={i}
                    openBigImg={() => {
                      this.openBigImg(true, i);
                    }}
                  />
                </React.Fragment>
              ))}
            {/* if no images */}
            {myImgs && myImgs.length === 0 && (
              <div className="noImg_div">
                <div>no imgase yet, upload your first profile image</div>
              </div>
            )}
          </div>
          {this.state.bigImg && (
            <BigImg
              index={this.state.index}
              img={bigImg}
              myImgs={myImgs}
              closeImgs={() => {
                this.openBigImg(false);
              }}
            />
          )}
        </div>
      </React.Fragment>
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
    // outimgEditMOde: (imgId) => dispatch(outimgEditMOde(imgId)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MyImgs);
