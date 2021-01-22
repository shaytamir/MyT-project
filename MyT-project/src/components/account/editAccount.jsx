import React from "react";
import Form from "../common/form";

import { schema } from "../../services/userService";
import { connect } from "react-redux";
import { toast } from "react-toastify";

import { editUser } from "../../store/editUser/editUserActions";
import { Redirect } from "react-router-dom";
import { swalConfitm } from "../../services/utils";
import { DeleteUser } from "../../store/user/userActions";
import { DELETElist } from "../../store/todoLists/lists/listsActions";
import { DELeteImg } from "../../store/userImg/userImgActions";

class EditAccount extends Form {
  constructor(props) {
    super(props);

    this.first_name = React.createRef();
  }
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
    img_value: "",
  };

  componentDidMount() {
    const { user } = this.props.data;
    this.setState({
      data: {
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
        cell: user.cell,
      },
    });
  }

  async handdleDELETE(user) {
    const { userTodos, imgs } = this.props.data;

    const prompt = await swalConfitm();
    if (prompt) {
      /* DELETE all user's todo lists */
      for (let list of userTodos) {
        await this.props.DELETElist(list);
      }
      /* DELETE all user's imgs */
      for (let img of imgs) {
        if (img.user_id === user._id) {
          await this.props.DELeteImg(img.id);
        }
      }
      /* ***** DELETE user *****  */
      await this.props.DeleteUser(user._id);
      window.location = "/login";
    }
  }
  schema = schema; /* user's schema */

  doSubmit = async () => {
    const { user } = this.props.data;
    const data = { ...this.state.data };
    data.biz = user.biz;
    data.gender = user.gender;

    try {
      await this.props.editUser(data, user._id);
      toast(`${data.first_name} edit profile successfully`);
      this.props.history.replace("/posts");
    } catch (ex) {
      console.error("edit post failed", ex);
    }
  };

  render() {
    const { user } = this.props.data;

    /* redirect !user */
    if (!this.props.data) return <Redirect to="/" />;

    console.log(this.state.img_value);
    return (
      <div id="createAcc_container">
        <div id="create_account" className="create_account middleDiv">
          <h1 className="create_account_h1">Edit Account</h1>
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

            {this.renderButton("Edit")}
          </form>
          {/* DELETE user btn */}
          <div className="delete_user_div">
            <img
              className="btn"
              src="/imgs/icons/delete-red.png"
              alt=""
              onClick={() => {
                this.handdleDELETE(user);
              }}
            />
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
    editUser: (data, userId) => dispatch(editUser(data, userId)),
    DeleteUser: (userId) => dispatch(DeleteUser(userId)),
    DELETElist: (list) => dispatch(DELETElist(list)),
    DELeteImg: (imgId) => dispatch(DELeteImg(imgId)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(EditAccount);
