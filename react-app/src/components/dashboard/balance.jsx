import React from "react";

const Balance = () => {
  return (
    <React.Fragment>
      <div className="top attached ui segment">
        <h3>Balance</h3>
        13 T
      </div>
      <div className="attached ui segment">
        <h4>Spend Tokens</h4>
        <div className="ui input fluid">
          <input type="text" placeholder="Amount" />
        </div>
        <br />
        <div className="ui input fluid">
          <input placeholder="Description" />
        </div>
        <br />
        <button class="ui primary basic button">Spend</button>
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
      </div>
    </React.Fragment>
  );
};

export default Balance;
