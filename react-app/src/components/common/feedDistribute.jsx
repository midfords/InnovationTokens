import React from "react";
import { Feed } from "semantic-ui-react";

const FeedDistribute = () => {
  return (
    <Feed.Event>
      <Feed.Label>
        <img src="/avatars/coins.svg" />
      </Feed.Label>
      <Feed.Content>
        <Feed.Summary>
          1000 Tokens Distributed!
          <Feed.Date>Last week</Feed.Date>
        </Feed.Summary>
        <Feed.Extra>Everybody has received new tokens!</Feed.Extra>
        <Feed.Meta>Hash: Q0AnmjsG7Rdlu8ZKygcH3Fs2QNqXK8.</Feed.Meta>
      </Feed.Content>
    </Feed.Event>
  );
};

export default FeedDistribute;
