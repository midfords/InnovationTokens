import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Header, Icon, Divider, List, Image } from "semantic-ui-react";
import userService from "../../services/userService";

class Team extends Component {
  state = {
    isFetching: false,
    team: []
  };

  async componentDidMount() {
    this.setState({ isFetching: true });
    const { data } = await userService.me();
    let { team } = data;
    if (!team) return;
    team.sort((i, j) => i.last.localeCompare(j.last));
    this.setState({ isFetching: false, team });
  }

  renderListItem(user) {
    return (
      <List.Item key={user._id}>
        <List.Content floated="right">{user.balance}T</List.Content>
        <Image avatar src="/avatars/avatar-3.svg" />
        <List.Content>
          {" "}
          <Link to={`/profile/${user._id}`}>
            {user.first} {user.last}
          </Link>
        </List.Content>
      </List.Item>
    );
  }

  render() {
    const { team } = this.state;

    return (
      <div className="ui segment">
        <Header>
          <Icon name="users" />
          Team
        </Header>
        <Divider />
        <List divided verticalAlign="middle">
          {team.map(i => this.renderListItem(i))}
        </List>
      </div>
    );
  }
}

export default Team;
