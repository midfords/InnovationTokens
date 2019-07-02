import React from "react";
import FeedSpend from "../common/feedSpend";
import FeedTransaction from "../common/feedTransaction";
import FeedDistribute from "../common/feedDistribute";

const Feed = () => {
  return (
    <div className="six wide column">
      <div className="ui segment">
        <h3>
          Innovation Feed <i className="fa fa-rss" />
        </h3>
        <FeedSpend />
        <FeedTransaction />
        <FeedDistribute />
        <FeedTransaction />
        <FeedTransaction />
        <FeedSpend />
        <FeedSpend />
      </div>
    </div>
  );
};

export default Feed;
