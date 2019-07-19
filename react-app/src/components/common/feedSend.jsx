import React from "react";
import { Link } from "react-router-dom";
import { Feed } from "semantic-ui-react";

const FeedSend = ({ sender, recipient, amount, hash }) => {
  return (
    <Feed.Event>
      <Feed.Label>
        <img src="/avatars/avatar-1.svg" />
      </Feed.Label>
      <Feed.Content>
        <Feed.Summary>
          <Link to={`/profile/${sender.id}`}>
            {`${sender.first} ${sender.last}`}
          </Link>{" "}
          gave{" "}
          <Link to={`/profile/${recipient.id}`}>
            {`${recipient.first} ${recipient.last}`}
          </Link>{" "}
          {amount} token
          {amount > 1 ? "s" : ""}.<Feed.Date>4 hours ago</Feed.Date>
        </Feed.Summary>
        <Feed.Meta>Hash: {hash}.</Feed.Meta>
      </Feed.Content>
    </Feed.Event>
  );
};

export default FeedSend;
