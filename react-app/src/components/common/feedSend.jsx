import React from "react";
import { Feed } from "semantic-ui-react";

const FeedSend = ({ user, user2, amount, hash }) => {
  return (
    <Feed.Event>
      <Feed.Label>
        <img src="/avatars/avatar-1.svg" />
      </Feed.Label>
      <Feed.Content>
        <Feed.Summary>
          <Feed.User>{user.name}</Feed.User> gave{" "}
          <Feed.User>{user2.name}</Feed.User> {amount} token
          {amount > 1 ? "s" : ""}.<Feed.Date>4 hours ago</Feed.Date>
        </Feed.Summary>
        <Feed.Meta>Hash: {hash}.</Feed.Meta>
      </Feed.Content>
    </Feed.Event>
  );
};

export default FeedSend;
