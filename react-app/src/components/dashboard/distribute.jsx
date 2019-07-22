import React, { Component } from "react";
import Joi from "joi-browser";
import _ from "lodash";
import { Header, Form, Button, Icon, Message } from "semantic-ui-react";
import transactionService from "../../services/transactionService";

class DistributeForm extends Component {
  state = {
    data: {
      amount: ""
    },
    success: false,
    errors: {},
    formError: ""
  };

  schema = {
    amount: Joi.number()
      .integer()
      .min(1)
      .required()
      .label("Amount")
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
    const obj = { [name]: value };
    const schema = { [name]: this.schema[name] };
    const { error } = Joi.validate(obj, schema);
    return error ? error.details[0].message : null;
  };

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
      await transactionService.distribute(this.state.data);
      this.setState({ success: true, data: { amount: "" } });
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
      <div className="ui segment">
        <Header>
          <Icon name="cog" />
          Distribute New Tokens
        </Header>
        {success && (
          <Message positive>
            <Icon className="green check circle outline" /> Tokens distributed!
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
          <Button
            type="submit"
            className="primary basic"
            disabled={!this.state.data.amount}
          >
            Distribute
          </Button>
        </Form>
      </div>
    );
  }
}

export default DistributeForm;
