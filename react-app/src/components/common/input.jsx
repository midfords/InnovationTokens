import React from "react";

const Input = ({ name, label, error, ...rest }) => {
  return (
    <div className="ui field">
      <div className="ui left icon input">
        <i className="user icon" />
        <input
          {...rest}
          name={name}
          id={name}
          className="ui left icon input"
          placeholder={label}
        />
        {error && <div className="ui error message">{error}</div>}
      </div>
    </div>
  );
};

export default Input;
