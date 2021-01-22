import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.scss";
import Navbar from "./components/common/navbar";
import CreateAccout from "./components/pages/createAccount";
import Login from "./components/pages/login";
import Logout from "./components/refs/logout";
import userService from "./services/userService";
import Posts from "./components/pages/posts/posts";
import MyTodos from "./components/pages/todos/myTodos";

import { connect } from "react-redux";
import { fetchData } from "./store/initialData/initActions";
import { fetchPosts } from "./store/posts/postsActions";
import EditAccount from "./components/account/editAccount";
import MyImgs from "./components/pages/my-imgs/myImgs";
import Footer from "./components/common/footer";
class App extends Component {
  state = {};
  async componentDidMount() {
    const user = userService.getCurrentUser();
    this.setState({ user });
    if (user) {
      await this.props.fetchData();
    } else {
      await this.props.fetchPosts();
    }
  }

  render() {
    if (this.props.user) {
      /* do somthing */
    }
    const { user } = this.state;

    return (
      <React.Fragment>
        <header className="App-header">
          <ToastContainer />
          <Navbar user={user} />
        </header>
        <main className="main">
          <Switch>
            {/* <ProtectedRoute path="/myv" component={MyV} biz={true} /> */}
            <Route path="/home" component={Posts} />
            <Route path="/posts" component={Posts} />
            <Route path="/todos" component={MyTodos} />
            <Route path="/my-images" component={MyImgs} />
            <Route path="/edit-profile" component={EditAccount} />
            <Route path="/login" component={Login} />
            <Route path="/logout" component={Logout} />
            <Route path="/create-account" component={CreateAccout} />
            <Route path="/Home" component={Posts} />
            <Route path="/" component={Posts} />
          </Switch>
        </main>
        <footer>
          <Footer />
        </footer>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state, more) => {
  return {
    user: state.user,
    data: state.data,
  };
};

const mapDispatchToProps = (dispatch) => ({
  fetchPosts: () => dispatch(fetchPosts()),
  fetchData: () => dispatch(fetchData()),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
