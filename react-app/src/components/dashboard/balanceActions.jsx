import React from "react";
import SendForm from "./sendForm";
import SpendForm from "./spendForm";

const BalanceActions = ({ ...all }) => {
  return (
    <React.Fragment>
      <div className="top attached ui segment">
        <SpendForm {...all} />
      </div>
      <div className="bottom attached ui segment">
        <SendForm {...all} />
      </div>
    </React.Fragment>
  );
};

export default BalanceActions;
