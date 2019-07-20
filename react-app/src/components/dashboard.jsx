import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import NavBar from "./common/navbar";
import Balance from "./dashboard/balance";
import Team from "./dashboard/team";
import Feed from "./dashboard/feed";
import BalanceActions from "./dashboard/balanceActions";
import userService from "../services/userService";
import auth from "../services/authService";

class Tokens extends Component {
  state = {
    first: "",
    balance: "",
    isManager: false
  };

  updateUser = async () => {
    const { data } = await userService.me();
    this.setState({
      balance: data.balance,
      first: data.first,
      isManager: data.roles.includes("manager")
    });
  };

  async componentWillMount() {
    this.updateUser();
  }

  render() {
    if (!auth.getCurrentUser()) return <Redirect to="/login" />;
    const { balance, first, isManager } = this.state;

    return (
      <React.Fragment>
        <NavBar />
        <h1 className="ui header container">Good Afternoon, {first}!</h1>
        <div className="ui grid container">
          <div className="ten wide column">
            {!isManager && (
              <div>
                <Balance balance={balance} />
                <BalanceActions balance={balance} onChange={this.updateUser} />
              </div>
            )}
            {isManager && <Team />}
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
