import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { Header, Label } from "semantic-ui-react";
import NavBar from "./common/navbar";
import Balance from "./dashboard/balance";
import Team from "./dashboard/team";
import DistributeForm from "./dashboard/distribute";
import Feed from "./dashboard/feed";
import BalanceActions from "./dashboard/balanceActions";
import userService from "../services/userService";
import auth from "../services/authService";

class Tokens extends Component {
  state = {
    first: "",
    balance: "",
    isManager: false,
    isAdmin: false
  };

  updateUser = async () => {
    const { data } = await userService.me();
    this.setState({
      balance: data.balance,
      first: data.first,
      isManager: data.roles.includes("manager"),
      isAdmin: data.roles.includes("admin")
    });
  };

  async componentWillMount() {
    this.updateUser();
  }

  render() {
    if (!auth.getCurrentUser()) return <Redirect to="/login" />;
    const { balance, first, isManager, isAdmin } = this.state;

    return (
      <React.Fragment>
        <NavBar />
        <Header className="ui container" size="huge">
          Good Afternoon, {first}! {isManager && <Label>Manager</Label>}{" "}
          {isAdmin && <Label>Admin</Label>}
        </Header>
        <div className="ui grid container">
          <div className="ten wide column">
            {!isManager && (
              <div>
                <Balance balance={balance} />
                <BalanceActions balance={balance} onChange={this.updateUser} />
              </div>
            )}
            {isManager && <Team />}
            {isAdmin && <DistributeForm />}
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
