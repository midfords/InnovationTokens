import React, { Component } from "react";
import Joi from "joi-browser";
import { Form, Button, Icon, Message } from "semantic-ui-react";
import http from "../../services/httpService";

class SpendForm extends Component {
  state = {
    data: {
      amount: "",
      message: ""
    },
    balance: 0,
    success: false,
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
    message: Joi.string()
      .required()
      .label("Description")
  };

  componentWillReceiveProps({ balance }) {
    this.setState({ balance });
  }

  updateData = (k, v) => {
    const data = { ...this.state.data };
    data[k] = v;
    this.setState({ data });
  };

  doSubmit = async () => {
    const { balance } = this.state;
    const { amount, message } = this.state.data;

    const { error: errors } = Joi.validate(
      { balance, amount, message },
      this.schema,
      {
        abortEarly: false
      }
    );

    if (errors) {
      console.log(errors);

      this.setState({ errors });
      return;
    }

    try {
      await http.post(
        "http://localhost:3900/api/transactions/spend",
        this.state.data
      );
      this.setState({ success: true, data: { amount: "", message: "" } });
    } catch (ex) {
      if (ex.res && ex.res.status === 400) {
        const errors = { ...this.state.errors };
        errors.first = ex.res.data;
        this.setState({ errors });
      }
    }
  };

  render() {
    const { success } = this.state;
    const { amount, message } = this.state.data;

    return (
      <React.Fragment>
        <h4>Spend Tokens</h4>
        {success && (
          <Message positive fluid>
            <Icon className="green check circle outline" /> Tokens spent!
          </Message>
        )}
        <Form onSubmit={this.doSubmit}>
          <Form.Input
            required
            fluid
            placeholder="Amount"
            onChange={e => this.updateData("amount", e.target.value)}
            value={amount}
          />
          <Form.Input
            fluid
            required
            placeholder="Description"
            onChange={e => this.updateData("message", e.target.value)}
            value={message}
          />
          <Button
            type="submit"
            className="primary basic"
            disabled={!this.state.data.amount || !this.state.data.message}
          >
            Spend
          </Button>
        </Form>
      </React.Fragment>
    );
  }
}

export default SpendForm;
