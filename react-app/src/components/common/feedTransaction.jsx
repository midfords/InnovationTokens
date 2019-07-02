import React from "react";

const FeedTransaction = () => {
  return (
    <div className="ui feed">
      <div className="event item">
        <div className="label">
          <img src="/avatars/avatar-1.svg" />
        </div>
        <div className="content">
          <div className="date">4 hours ago</div>
          <div className="summary">
            <a>Sean Midford</a> gave <a>Eric Wu</a> 2 tokens.
          </div>
          <div className="meta">Hash: 4F2DWYg96PMDLc10mDnvOJEBgRuTuA.</div>
        </div>
      </div>
    </div>
  );
};

export default FeedTransaction;
