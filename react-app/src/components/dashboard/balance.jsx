import React, { Component } from "react";
import { Header, Icon, Divider } from "semantic-ui-react";
import http from "../../services/httpService";

class Balance extends Component {
  render() {
    const { balance } = this.props;

    return (
      <div className="ui segment">
        <Header>
          <Icon name="clock outline" />
          Balance
        </Header>
        <Divider />
        {balance}T
      </div>
    );
  }
}

export default Balance;
