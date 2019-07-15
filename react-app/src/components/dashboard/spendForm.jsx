import React, { Component } from "react";
import Joi from "joi-browser";
import { Form, Button } from "semantic-ui-react";

class SpendForm extends Component {
  state = {
    data: {
      amount: "",
      description: ""
    },
    balance: 0,
    errors: {}
  };

  schema = {
    balance: Joi.number(),
    amount: Joi.number()
      .integer()
      .min(1)
      .max(Joi.ref("balance"))
      .required()
      .label("Amount"),
    description: Joi.string()
      .required()
      .label("Description")
  };

  componentDidMount() {
    this.setState({ balance: this.props.balance });
  }

  updateData = (k, v) => {
    const data = { ...this.state.data };
    data[k] = v;
    this.setState({ data });
  };

  doSubmit = () => {
    const { balance } = this.state;
    const { amount, description } = this.state.data;

    const { error: errors } = Joi.validate(
      { balance, amount, description },
      this.schema,
      {
        abortEarly: false
      }
    );

    if (errors) {
      this.setState({ errors });
      return;
    }

    try {
    } catch (ex) {
      if (ex.res && ex.res.status === 400) {
        const errors = { ...this.state.errors };
        errors.first = ex.res.data;
        this.setState({ errors });
      }
    }
  };

  render() {
    return (
      <React.Fragment>
        <h4>Spend Tokens</h4>
        <Form onSubmit={this.doSubmit}>
          <Form.Input
            required
            fluid
            placeholder="Amount"
            onChange={e => this.updateData("amount", e.target.value)}
          />
          <Form.Input
            fluid
            required
            placeholder="Description"
            onChange={e => this.updateData("description", e.target.value)}
          />
          <Button
            type="submit"
            className="primary basic"
            disabled={!this.state.data.amount || !this.state.data.description}
          >
            Spend
          </Button>
        </Form>
      </React.Fragment>
    );
  }
}

export default SpendForm;