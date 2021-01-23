import React, { Component } from "react";

import { connect } from "react-redux";
import { AddPost } from "../../../store/posts/addPost/addPostActions";
import { toast } from "react-toastify";

import PostItem from "./postItem";
import { incPostsCount } from "../../../services/userService";
import { postsSearchFilter } from "../../../services/searchService";
import { Link } from "react-router-dom";
import Header from "../../common/header";

class Posts extends Component {
  state = {
    text: "",
    isMyPosts: false,
    isLikes: false,
    activeBtn: "Posts",
    sortPosts: "asc",
  };

  valueChange = (e) => {
    this.setState({ text: e.target.value });
  };

  handleAddPost = async (e) => {
    const { user } = this.props.data;
    if (this.state.text.length >= 2) {
      try {
        await this.props.AddPost(this.state.text, user);
        await incPostsCount();
      } catch (ex) {
        console.log("post failed..");
        toast(`New Post failed `);
      }
    }
    this.setState({ text: "" });
    e.target.value = "";
  };

  go2posts() {
    this.setState({ isPosts: true, isMyPosts: false, isLikes: false });
  }
  go2myPosts() {
    this.setState({ isMyPosts: true, isPosts: false, isLikes: false });
  }
  go2likes() {
    this.setState({ isLikes: true, isMyPosts: false, isPosts: false });
  }

  sortChange(e) {
    this.setState({ sortPosts: e.target.value });
  }
  render() {
    const { user, search } = this.props.data;
    let { text, activeBtn, sortPosts } = this.state;

    let posts,
      title = "Community Posts";

    /* is user ? */
    if (!user.first_name) {
      posts = this.props.posts.posts;
      /* user: */
    } else if (user.first_name) {
      posts = this.props.data.posts;
      /* user: my posts */
      if (this.state.isMyPosts) {
        posts = this.props.data.posts.filter((post) => {
          return post.user_id === user._id;
        });
        title = "My Posts";
        activeBtn = "My-Posts";
      }
      /* user:  favorite posts */
      if (this.state.isLikes) {
        posts = this.props.data.posts.filter((post) => {
          return post.likes.includes(user._id);
        });
        title = "Liked posts";
        activeBtn = "Likes";
      }
    }
    /* when search */
    if (search.length > 0) {
      posts = postsSearchFilter(posts, search);
      title = "Search in Posts";
    }
    /* if sort descending */
    if (sortPosts === "desc") {
      posts = [].concat(posts).reverse();
    }

    return (
      <div className="container main_post_div ">
        <Header title={title} />
        <hr />

        {/* not user create account bunner */}
        {!user.first_name && (
          <React.Fragment>
            <div className="create_account_bunner">
              <div className=" button_div">
                <Link to="/create-account" className="btn">
                  Create Account
                </Link>
              </div>
            </div>
          </React.Fragment>
        )}
        {/* posts nav */}
        <div className="postType_btn ">
          <div>
            {user.first_name && (
              <React.Fragment>
                <button
                  className={`btn ${activeBtn === "Posts" ? "active" : ""}`}
                  onClick={() => {
                    this.go2posts();
                  }}
                >
                  Posts
                </button>
                <button
                  className={`btn ${activeBtn === "My-Posts" ? "active" : ""}`}
                  onClick={() => {
                    this.go2myPosts();
                  }}
                >
                  My-Posts
                </button>
                <button
                  className={`btn ${activeBtn === "Likes" ? "active" : ""}`}
                  onClick={() => {
                    this.go2likes();
                  }}
                >
                  Likes
                </button>
              </React.Fragment>
            )}
          </div>
          {posts && posts.length > 0 && (
            <div className="sort_posts">
              <select
                name=""
                id=""
                onChange={(e) => {
                  this.sortChange(e);
                }}
              >
                <option value="asc">new to old</option>
                <option value="desc">old to new</option>
              </select>
            </div>
          )}
        </div>
        {/* post textarea */}
        {user.first_name && (
          <React.Fragment>
            <h4 className="newPosts_header">Post a new post</h4>
            <div className="flex">
              <textarea
                name="postField"
                id="postField"
                cols="30"
                rows="5"
                value={text}
                onChange={(e) => this.valueChange(e)}
              ></textarea>
              <button
                className="post_btn btn btn-success"
                type="button"
                onClick={(e) => this.handleAddPost(e)}
              >
                Post
              </button>
            </div>
          </React.Fragment>
        )}

        <div>
          {posts &&
            posts.length > 0 &&
            posts.map((post, i) => (
              <React.Fragment key={i}>
                <PostItem post={post} user={user} />
              </React.Fragment>
            ))}

          {/* no posts messages */}
          {posts && posts.length === 0 && (
            <React.Fragment>
              {activeBtn === "Posts" && (
                <p className="text-center no_posts">
                  no posts yet, be the first to post yout mind
                </p>
              )}
              {activeBtn === "Likes" && (
                <p className="text-center no_posts">
                  you didnt like any post yet...
                </p>
              )}
              {activeBtn === "My-Posts" && (
                <p className="text-center no_posts">
                  You have no posts yet, feel free to post your mind..
                </p>
              )}
            </React.Fragment>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, more) => {
  return {
    posts: state.posts,
    data: state.data,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    AddPost: (post, user) => dispatch(AddPost(post, user)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Posts);
