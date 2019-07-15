import React, { Component } from "react";
import http from "../services/httpService";
import NavBar from "./common/navbar";
import Balance from "./dashboard/balance";
import Goal from "./dashboard/goal";
import Feed from "./dashboard/feed";
import Leaderboard from "./dashboard/leaderboard";
import BalanceActions from "./dashboard/balanceActions";

class Tokens extends Component {
  state = {
    balance: ""
  };

  async componentWillMount() {
    const { data } = await http.get("http://localhost:3900/api/users/me");
    this.setState({ balance: data.balance });
  }

  render() {
    const { balance } = this.state;

    return (
      <React.Fragment>
        <NavBar />
        <h1 className="ui header container">Tokens Dashboard</h1>
        <div className="ui grid container">
          <div className="ten wide column">
            <Balance balance={balance} />
            <BalanceActions balance={balance} />
            <Goal />
            <Leaderboard />
          </div>
          <div className="six wide column">
            <Feed />
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Tokens;
