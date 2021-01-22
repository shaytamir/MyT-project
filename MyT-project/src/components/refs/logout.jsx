import { Component } from "react";
import userService from "../../services/userService";

class Logout extends Component {
  componentDidMount() {
    userService.logout();
    window.location = "/login";
  }

  render() {
    return null;
  }
}

export default Logout;
