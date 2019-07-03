import React from "react";

const BalanceActions = () => {
  return (
    <React.Fragment>
      <div className="top attached ui segment">
        <h4>Spend Tokens</h4>
        <div className="ui input fluid">
          <input type="text" placeholder="Amount" />
        </div>
        <br />
        <div className="ui input fluid">
          <input placeholder="Description" />
        </div>
        <br />
        <button className="ui primary basic button">Spend</button>
      </div>
      <div className="bottom attached ui segment">
        <h4>Send Tokens</h4>
        <div className="ui input fluid">
          <input placeholder="Amount" />
        </div>
        <br />
        <div className="ui input fluid">
          <input placeholder="Recipient" />
        </div>
        <br />
        <button className="ui primary basic button">Send</button>
      </div>{" "}
    </React.Fragment>
  );
};

export default BalanceActions;
