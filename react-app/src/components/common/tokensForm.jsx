import React, { Component } from "react";

class TokensForm extends Component {
  updateData = (k, v) => {
    const data = { ...this.state.data };
    data[k] = v;
    this.setState({ data });
  };

  renderInput({ key, ...rest }) {
    return (
      <Form.Input
        fluid
        {...rest}
        onChange={e => this.updateData(key, e.target.value)}
        error={errors.last}
      />
    );
  }
}

export default TokensForm;
