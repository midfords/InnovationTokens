import React, { Component } from "react";
import Joi from "joi-browser";
import _ from "lodash";
import { Form, Button, Icon, Message } from "semantic-ui-react";
import transactionService from "../../services/transactionService";

class SpendForm extends Component {
  state = {
    data: {
      balance: 0,
      amount: "",
      message: ""
    },
    success: false,
    errors: {},
    formError: ""
  };

  schema = {
    balance: Joi.number().required(),
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

  validate = () => {
    const errors = {};
    const data = { ...this.state.data };
    const { error } = Joi.validate(data, this.schema, {
      abortEarly: false
    });

    if (!error) return errors;

    for (let item of error.details) errors[item.path[0]] = item.message;
    return errors;
  };

  validateProperty = (name, value) => {
    const obj = { balance: this.state.data.balance, [name]: value };
    const schema = {
      balance: this.state.data.balance,
      [name]: this.schema[name]
    };
    const { error } = Joi.validate(obj, schema);
    return error ? error.details[0].message : null;
  };

  componentWillReceiveProps({ balance }) {
    const data = { ...this.state.data };
    data.balance = balance;
    this.setState({ data });
  }

  handleChange = (e, { name, value }) => {
    const errors = { ...this.state.errors };
    const errorMessage = this.validateProperty(name, value);
    if (errorMessage) errors[name] = errorMessage;
    else delete errors[name];

    const data = { ...this.state.data };
    data[name] = value;
    this.setState({ data, errors });
  };

  doSubmit = async () => {
    const errors = this.validate();

    this.setState({ errors });
    if (!_.isEmpty(errors)) return;

    try {
      await transactionService.spend(this.state.data);
      this.setState({ success: true, data: { amount: "", message: "" } });
      this.props.onChange();
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        const formError = ex.response.data;
        this.setState({ success: false, formError });
      }
    }
  };

  render() {
    const { success, errors, formError } = this.state;
    const { amount, message } = this.state.data;

    return (
      <React.Fragment>
        <h4>Spend Tokens</h4>
        {success && (
          <Message positive>
            <Icon className="green check circle outline" /> Tokens spent!
          </Message>
        )}
        {formError && (
          <Message error header="Something went wrong." list={[formError]} />
        )}
        <Form onSubmit={this.doSubmit}>
          <Form.Input
            required
            fluid
            name="amount"
            placeholder="Amount"
            onChange={this.handleChange}
            error={errors.amount}
            value={amount}
          />
          <Form.Input
            fluid
            required
            name="message"
            placeholder="Description"
            onChange={this.handleChange}
            error={errors.message}
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
