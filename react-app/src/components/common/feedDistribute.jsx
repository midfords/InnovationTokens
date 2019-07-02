import React from "react";

const FeedDistribute = () => {
  return (
    <div className="ui feed">
      <div className="event item">
        <div className="label">
          <img src="/avatars/coins.svg" />
        </div>
        <div className="content">
          <div className="date">Last week</div>
          <div className="summary">1000 Tokens Distributed!</div>
          <div className="extra">Everybody has received new tokens!</div>
          <div className="meta">Hash: PMcN1lV9DwDE5pApTXp943Ufnwm09i.</div>
        </div>
      </div>
    </div>
  );
};

export default FeedDistribute;
