import React from "react";
import { Feed } from "semantic-ui-react";

const FeedSpend = ({ user, amount, description, hash }) => {
  return (
    <Feed.Event>
      <Feed.Label>
        <img src="/avatars/avatar-3.svg" />
      </Feed.Label>
      <Feed.Content>
        <Feed.Summary>
          <Feed.User>{user.name}</Feed.User> spent {amount} tokens.
          <Feed.Date>Just now</Feed.Date>
        </Feed.Summary>
        <Feed.Extra>{description}</Feed.Extra>
        <Feed.Meta>Hash: {hash}.</Feed.Meta>
      </Feed.Content>
    </Feed.Event>
  );
};

export default FeedSpend;
