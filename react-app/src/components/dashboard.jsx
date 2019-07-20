import React, { Component } from "react";
import NavBar from "./common/navbar";
import Balance from "./dashboard/balance";
import Feed from "./dashboard/feed";
import BalanceActions from "./dashboard/balanceActions";
import userService from "../services/userService";

class Tokens extends Component {
  state = {
    first: "",
    balance: ""
  };

  updateUser = async () => {
    const { data } = await userService.me();
    this.setState({ balance: data.balance, first: data.first });
  };

  async componentWillMount() {
    this.updateUser();
  }

  render() {
    const { balance, first } = this.state;

    return (
      <React.Fragment>
        <NavBar />
        <h1 className="ui header container">Good Afternoon, {first}!</h1>
        <div className="ui grid container">
          <div className="ten wide column">
            <Balance balance={balance} />
            <BalanceActions balance={balance} onChange={this.updateUser} />
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
