import React from "react";

const FeedSpend = () => {
  return (
    <div className="ui feed">
      <div className="event item">
        <div className="label">
          <img src="/avatars/avatar-3.svg" />
        </div>
        <div className="content">
          <div className="date">Just now</div>
          <div className="summary">
            <a>Jonathan Dure</a> spent 5 tokens.
          </div>
          <div className="extra">Building an Innovation Tokens project.</div>
          <div className="meta">Hash: PMcN1lV9DwDE5pApTXp943Ufnwm09i.</div>
        </div>
      </div>
    </div>
  );
};

export default FeedSpend;
