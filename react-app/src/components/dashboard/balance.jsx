import React from "react";
import { Header, Icon, Divider } from "semantic-ui-react";

const Balance = () => {
  return (
    <div className="ui segment">
      <Header as="h3">
        <Icon name="clock outline" />
        Balance
      </Header>
      <Divider />
      13T
    </div>
  );
};

export default Balance;
