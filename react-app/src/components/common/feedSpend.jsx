import React from "react";
import { Link } from "react-router-dom";
import { Feed } from "semantic-ui-react";

const FeedSpend = ({ sender, amount, description, hash }) => {
  return (
    <Feed.Event>
      <Feed.Label>
        <img src="/avatars/avatar-3.svg" />
      </Feed.Label>
      <Feed.Content>
        <Feed.Summary>
          <Link to={`/profile/${sender.id}`}>
            <Feed.User>{`${sender.first} ${sender.last}`}</Feed.User>
          </Link>{" "}
          spent {amount} tokens.
          <Feed.Date>Just now</Feed.Date>
        </Feed.Summary>
        <Feed.Extra>{description}</Feed.Extra>
        <Feed.Meta>Hash: {hash}.</Feed.Meta>
      </Feed.Content>
    </Feed.Event>
  );
};

export default FeedSpend;
