import React, { Component } from "react";
import { Redirect, Link } from "react-router-dom";
import { Button, Form, Header, Input, Message } from "semantic-ui-react";
import _ from "lodash";
import Joi from "joi-browser";
import NavBar from "./common/navbar";
import auth from "../services/authService";

class LoginForm extends Component {
  state = {
    data: { email: "", password: "" },
    errors: {},
    formError: ""
  };

  schema = {
    email: Joi.string()
      .required()
      .label("Email"),
    password: Joi.string()
      .required()
      .label("Password")
  };

  validate = () => {
    const errors = {};
    const { error } = Joi.validate(this.state.data, this.schema, {
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

    let obj = { ...this.state.data };
    obj[name] = value;
    this.setState({ data: obj, errors });
  };

  doSubmit = async () => {
    const errors = this.validate();

    this.setState({ errors });
    if (!_.isEmpty(errors)) return;

    try {
      let { email, password } = this.state.data;
      email += "@hrsdc-rhdcc.gc.ca";
      await auth.login(email, password);
      const { state } = this.props.location;
      window.location = state ? state.from.pathname : "/dashboard";
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        const formError = ex.response.data;
        this.setState({ formError });
      }
    }
  };

  render() {
    if (auth.getCurrentUser()) return <Redirect to="/dashboard" />;
    const { errors, formError } = this.state;

    return (
      <React.Fragment>
        <NavBar />
        <div className="ui main text container segment">
          <div className="ui middle aligned center aligned grid">
            <div className="column">
              <Header>Login</Header>
              {formError && (
                <Message error header="Login error" list={[formError]} />
              )}
              <Form size="large" onSubmit={this.doSubmit}>
                <Form.Input error={errors.email}>
                  <Input
                    name="email"
                    label={{ basic: true, content: "@hrsdc-rhdcc.gc.ca" }}
                    labelPosition="right"
                    placeholder="Email"
                    onChange={this.handleChange}
                  />
                </Form.Input>
                <Form.Input
                  name="password"
                  fluid
                  icon="eye slash"
                  placeholder="Password"
                  type="password"
                  onChange={this.handleChange}
                  error={errors.password}
                />
                <Button
                  primary
                  disabled={!this.state.data.email || !this.state.data.password}
                >
                  Login
                </Button>
              </Form>
              <div className="ui message">
                Or <Link to="/register">sign up</Link>.
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default LoginForm;
