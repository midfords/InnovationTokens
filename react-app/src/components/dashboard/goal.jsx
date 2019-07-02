import React from "react";

const Goal = () => {
  return (
    <div className="ui segment">
      <h3>Weekly Goal</h3>
      <div className="ui indicating blue progress">
        <div className="bar">
          <div className="progress" />
        </div>
        <div className="label">Progress</div>
      </div>
    </div>
  );
};

export default Goal;
