import React from "react";
import Form from "../common/form";
import { createAccount } from "../../services/userService";
import { toast } from "react-toastify";
import { Redirect } from "react-router-dom";
import { schema } from "../../services/userService";

class CreateAccout extends Form {
  state = {
    data: {
      first_name: "",
      last_name: "",
      email: "",
      cell: "",

      password: "",
      password_confirm: "",
    },
    errors: {},
  };

  todosObj = [
    {
      id: 1,
      name: "start list",
      todos: [
        {
          id: 1,
          title: "my first todo",
          isChecked: true,
          isDeleted: false,
        },
      ],
      isDelited: false,
      delitedTodos: [],
      listColor: "#D7AEFB",
      peackColor: false,
    },
  ];

  user_img =
    "https://cdn.pixabay.com/photo/2017/05/13/23/05/img-src-x-2310895_960_720";

  schema = schema; /* user schema */

  doSubmit = async () => {
    const data = { ...this.state.data };
    data.biz = false;
    data.gender = "other";

    try {
      await createAccount(data);
      toast(`${data.first_name} sign up successfully`);
      this.props.history.replace("/login");
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        this.setState({ errors: { email: "Email is taken" } });
      }
    }
  };

  render() {
    if (this.props.data) return <Redirect to="/" />;

    return (
      <div id="createAcc_container">
        <div id="create_account" className="create_account middleDiv">
          <h1 className="create_account_h1">Create New Account</h1>
          <form
            className="create_account_form container"
            action="/login/create_account"
            method="POST"
            autoComplete="off"
            name="account_formm"
            onSubmit={this.handleSubmit}
          >
            {this.renderInput(
              "first_name",
              "First Name",
              "text",
              "Enter your First Name"
            )}

            {this.renderInput(
              "last_name",
              "Last Name",
              "text",
              "Enter your Last Name"
            )}
            {this.renderInput("email", "Email", "email", "Enter your email")}

            {this.renderInput("cell", "Cell", "phone", "Enter your Cell")}
            {this.renderInput(
              "password",
              "Password",
              "password",
              "Enter your password"
            )}
            {this.renderInput(
              "password_confirm",
              "Password Confirm",
              "password",
              "ReEnter your password"
            )}
            {this.renderButton("Continue")}
          </form>
        </div>
      </div>
    );
  }
}

export default CreateAccout;
