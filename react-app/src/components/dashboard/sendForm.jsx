import React, { Component } from "react";
import Joi from "joi-browser";
import _ from "lodash";
import { Form, Button, Search, Popup, Message, Icon } from "semantic-ui-react";
import userService from "../../services/userService";
import transactionService from "../../services/transactionService";

class SendForm extends Component {
  state = {
    data: {
      balance: 0,
      amount: "",
      message: "",
      recipientId: ""
    },
    search: {
      isLoading: false,
      results: [],
      value: ""
    },
    success: false,
    errors: {}
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
      .allow("")
      .label("Message"),
    recipientId: Joi.string()
      .required()
      .label("Recipient")
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
    const schema = { balance: this.schema.balance, [name]: this.schema[name] };
    const { error } = Joi.validate(obj, schema);
    console.log(name);
    console.log(value);
    console.log(error);

    return error ? error.details[0].message : null;
  };

  componentWillReceiveProps({ balance }) {
    const data = { ...this.state.data };
    data.balance = balance;
    this.setState({ data });
  }

  handleResultSelect = (e, { result }) => {
    const state = { ...this.state };
    state.search.value = result.title;
    state.data.recipientId = result.id;

    this.setState(state);
  };

  handleSearchChange = async (e, { value }) => {
    const search = { ...this.state.search };
    search.isLoading = true;
    search.value = value;

    this.setState({ search });

    userService.userLookup(value).then(res => {
      const search = { ...this.state.search };
      search.isLoading = false;
      search.results = res.data.map(i => ({
        title: `${i.first} ${i.last}`,
        description: i.email,
        id: i._id
      }));

      this.setState({ search });
    });
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
      await transactionService.send(this.state.data);
      const state = { ...this.state };
      state.success = true;
      state.data.amount = "";
      state.data.message = "";
      state.search.value = "";
      this.setState(state);
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
    const { isLoading, value, results } = this.state.search;

    return (
      <React.Fragment>
        <h4>Send Tokens</h4>
        {success && (
          <Message positive fluid>
            <Icon className="green check circle outline" /> Tokens sent!
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
            value={amount}
            error={errors.amount}
          />
          <Form.Input
            fluid
            name="message"
            placeholder="Message"
            onChange={this.handleChange}
            value={message}
            error={errors.message}
          />
          <Form.Field
            required
            name="recipient"
            placeholder="Recipient"
            onChange={this.handleChange}
            error={errors.recipient}
          >
            <Popup
              content="Lookup people by name or email."
              trigger={
                <Search
                  className="field input"
                  placeholder="Recipient"
                  loading={isLoading}
                  minCharacters={2}
                  onResultSelect={this.handleResultSelect}
                  onSearchChange={this.handleSearchChange}
                  results={results}
                  value={value}
                />
              }
            />
          </Form.Field>
          <Button
            type="submit"
            className="primary basic"
            disabled={!this.state.data.amount || !this.state.data.recipientId}
          >
            Send
          </Button>
        </Form>
      </React.Fragment>
    );
  }
}

export default SendForm;
