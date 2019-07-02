import React, { Component } from "react";
import NavBar from "./common/navbar";
import Balance from "./dashboard/balance";
import Goal from "./dashboard/goal";
import Feed from "./dashboard/feed";
import Leaderboard from "./dashboard/leaderboard";

class Tokens extends Component {
  render() {
    return (
      <React.Fragment>
        <NavBar />
        <h1 className="ui header container">Tokens Dashboard</h1>
        <div className="ui grid container">
          <div className="ten wide column">
            <Balance />
            <Goal />
            <Leaderboard />
          </div>
          <Feed />
        </div>
      </React.Fragment>
    );
  }
}

export default Tokens;
