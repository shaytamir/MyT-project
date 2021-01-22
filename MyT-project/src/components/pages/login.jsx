import React from "react";
import Form from "../common/form";
import Joi from "joi-browser";
import userService from "../../services/userService";
// import http from "../../services/httpService";
// import { apiUrl } from "../../config.json";
import { Redirect } from "react-router-dom";

class Login extends Form {
  state = {
    data: { email: "", password: "" },
    errors: {},
  };

  schema = {
    email: Joi.string().required().email().label("Email"),
    password: Joi.string().required().min(6).max(1024).label("password"),
  };

  doSubmit = async () => {
    const data = { ...this.state.data };
    try {
      const res = await userService.login(data.email, data.password);
      if (res.token) {
        window.location = "/posts";
        console.log(222);
      }
      this.setState({ errors: { email: res } });
    } catch (err) {
      console.log("eror user login", err);
    }
  };

  render() {
    if (this.props.data) return <Redirect to="/" />;
    return (
      <div className="login_container">
        <div id="login" className="login middleDiv">
          <h1>Login to MyT</h1>
          <h2>Enter you email address and your password</h2>
          <div className="form_div">
            <form
              className="log_form"
              onSubmit={this.handleSubmit}
              method="POST"
              autoComplete="off"
            >
              {this.renderInput("email", "Email", "email", "Enter your email")}
              {this.renderInput(
                "password",
                "Password",
                "password",
                "Enter your password"
              )}
              {this.renderButton("Login")}
            </form>
          </div>
        </div>
      </div>
    );
  }
}
export default Login;
