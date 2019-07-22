import React, { Component } from "react";
import { Feed, Header, Divider } from "semantic-ui-react";
import NavBar from "./common/navbar";
import userService from "../services/userService";

class Profile extends Component {
  state = { isFetching: false, user: {}, feed: [] };

  async componentDidMount() {
    const { id } = this.props.match.params;
    this.setState({ isFetching: true });
    const { data } = await userService.findById(id);
    this.setState({ isFetching: false, user: data });
  }

  render() {
    const { name, email, balance } = this.state.user;

    return (
      <React.Fragment>
        <NavBar />
        <div className="ui grid header container">
          <div className="ui three wide column">
            <img src="/avatars/avatar-1.svg" />
          </div>
          <div className="ui six wide column">
            <Header>{name}</Header>
            <div className="content">{email}</div>
            <Divider />
            {balance} Tokens
          </div>
        </div>
        <Feed />
      </React.Fragment>
    );
  }
}

export default Profile;
