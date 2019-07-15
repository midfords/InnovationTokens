import React from "react";
import { Header, Icon, Divider } from "semantic-ui-react";

const Balance = ({ balance }) => {
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
};

export default Balance;
