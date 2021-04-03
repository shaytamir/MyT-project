import React, { Component } from "react";
import { NavLink, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { imgUrl } from "../../config.json";

import { search } from "../../store/search/searchActions";

class Navbar extends Component {
  state = {};

  handdleChange(e) {
    console.log(e.target.value);
    this.props.search(e.target.value);
  }

  go2myImags() {
    <Redirect to="/my-images"></Redirect>;
  }

  render() {
    const { user, imgs } = this.props.data;
    let userImg = null,
      img = null;

    if (user.haveImg) {
      userImg = imgs.find((img) => {
        return img.user_id === user._id && img.isProfileImg;
      });
      if (userImg) {
        img = `${userImg.imageData}`;
      } else img = "/imgs/users/static/pok.png";
    }

    if (img && img.includes("blob")) img = userImg.imageData;
    else if (img && !img.includes("blob")) img = img;
    console.log(img);
    return (
      <div className=" main_navbar">
        <nav className="navbar navbar-expand-md navbar-light myNav" id="myNav">
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mr-auto nav_ul">
              <li className="nav-item">
                <NavLink className="nav-link" to="/posts">
                  <div className="btn ">Posts</div>
                </NavLink>
              </li>
              {user && user.first_name && (
                <React.Fragment>
                  <li className="nav-item">
                    <NavLink className="nav-link" to="/todos">
                      <div className="btn">MyTodos</div>
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink className="nav-link" to="/my-images">
                      <div className="btn">MyIMages</div>
                    </NavLink>
                  </li>
                  <li className="nav-item dropdown nav_ul_account">
                    <div
                      className="nav-link dropdown-toggle"
                      id="navbarDropdown"
                      role="button"
                      data-toggle="dropdown"
                      aria-haspopup="true"
                      aria-expanded="false"
                    >
                      Account
                    </div>

                    <div
                      className="dropdown-menu"
                      aria-labelledby="navbarDropdown"
                    >
                      <NavLink className="dropdown-item " to="/edit-profile">
                        Edit Account
                      </NavLink>

                      <div className="dropdown-divider"></div>
                      <NavLink className="dropdown-item" to="/logout">
                        Logout
                      </NavLink>
                    </div>
                  </li>
                </React.Fragment>
              )}
            </ul>
            {!user.first_name && (
              <React.Fragment>
                <ul className="navbar-nav mr-right">
                  <li className="nav-link">
                    <NavLink className="nav-link" to="/login">
                      Login
                    </NavLink>
                  </li>
                  <li className="nav-link">
                    <NavLink className="nav-link" to="/create-account">
                      Create Account
                    </NavLink>
                  </li>
                </ul>
              </React.Fragment>
            )}
          </div>
        </nav>
        {user && (
          <form className="  search">
            <input
              className="form-control mr-sm-2 search_input"
              type="search"
              placeholder="Search"
              aria-label="Search"
              onChange={(e) => {
                this.handdleChange(e);
              }}
            />
          </form>
        )}
        {user.haveImg && (
          <NavLink to="/my-images">
            <img
              className="nav_user_img"
              src={`${img}`}
              alt="user-imge"
              onClick={() => {
                this.go2myImags();
              }}
            />
          </NavLink>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state, more) => {
  return {
    data: state.data,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    search: (value) => dispatch(search(value)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
