import React, { Component } from "react";
import { Feed, Header, Icon, Divider } from "semantic-ui-react";
import FeedSpend from "../common/feedSpend";
import FeedSend from "../common/feedSend";
import FeedDistribute from "../common/feedDistribute";
import feed from "../../services/feedService";

class InnovationFeed extends Component {
  state = { isFetching: false, feed: [] };

  async componentDidMount() {
    this.setState({ isFetching: true });
    let { data } = await feed.get();
    data.sort((i, j) => j._id.localeCompare(i._id));
    this.setState({ isFetching: false, feed: data });
  }

  renderTransaction({
    _id,
    kind,
    sender,
    recipient,
    amount,
    description,
    hash
  }) {
    switch (kind) {
      case "spend":
        return (
          <FeedSpend
            key={_id}
            sender={sender}
            amount={amount}
            description={description}
            hash={hash}
          />
        );
      case "send":
        return (
          <FeedSend
            key={_id}
            sender={sender}
            recipient={recipient}
            amount={amount}
            description={description}
            hash={hash}
          />
        );
      case "dist":
        return (
          <FeedDistribute
            key={_id}
            amount={amount}
            description={description}
            hash={hash}
          />
        );
    }
  }

  render() {
    return (
      <div className="ui segment">
        <Header as="h3">
          <Icon name="rss" />
          Recent Activity
        </Header>
        <Divider />
        <Feed>
          {this.state.feed
            .slice(0, 10)
            .map(item => this.renderTransaction(item))}
        </Feed>
        {/* <Divider />
        <a href="#">Load More</a> */}
      </div>
    );
  }
}

export default InnovationFeed;
