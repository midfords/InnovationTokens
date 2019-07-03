import React, { Component } from "react";

class Search extends Component {
  state = {};

  render() {
    const { name, label, error, options, ...rest } = this.props;

    return (
      <div className="ui field">
        <label>{label}</label>
        <input className="prompt" type="text" {...rest} />
        <div className="results" />
      </div>
    );
  }
}

export default Search;
