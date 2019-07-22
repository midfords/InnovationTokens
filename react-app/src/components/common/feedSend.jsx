import React from "react";
import { Link } from "react-router-dom";
import { Feed, Image } from "semantic-ui-react";

const FeedSend = ({ sender, recipient, amount, hash }) => {
  return (
    <Feed.Event>
      <Feed.Label>
        <Image src="/avatars/avatar-1.svg" />
      </Feed.Label>
      <Feed.Content>
        <Feed.Summary>
          <Link to={`/profile/${sender._id}`}>
            {`${sender.first} ${sender.last}`}
          </Link>{" "}
          gave{" "}
          <Link to={`/profile/${recipient._id}`}>
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
