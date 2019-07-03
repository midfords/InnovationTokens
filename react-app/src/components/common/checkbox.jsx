import React from "react";

const Checkbox = ({ name, label }) => {
  return (
    <div className="ui field">
      <div className="ui checkbox">
        <input type="checkbox" name={name} />
        <label>{label}</label>
      </div>
    </div>
  );
};

export default Checkbox;
