import React, { Component } from "react";
import { Redirect, Link } from "react-router-dom";
import { Button, Form, Header, Input } from "semantic-ui-react";
import _ from "lodash";
import Joi from "joi-browser";
import NavBar from "./common/navbar";
import auth from "../services/authService";

class LoginForm extends Component {
  state = {
    data: { email: "", password: "" },
    errors: {}
  };

  schema = {
    email: Joi.string()
      .required()
      .label("Email"),
    password: Joi.string()
      .required()
      .label("Password")
  };

  handleChange = (e, { name, value }) => {
    let obj = { ...this.state.data };
    obj[name] = value;
    this.setState({ data: obj });
  };

  doSubmit = async () => {
    try {
      let { email, password } = this.state.data;
      email += "@hrsdc-rhdcc.gc.ca";
      await auth.login(email, password);
      const { state } = this.props.location;
      window.location = state ? state.from.pathname : "/dashboard";
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        const errors = { ...this.state.errors };
        errors.username = ex.response.data;
        this.setState({ errors });
      }
    }
  };

  render() {
    if (auth.getCurrentUser()) return <Redirect to="/dashboard" />;
    console.log(auth);
    console.log(auth.getCurrentUser());

    return (
      <React.Fragment>
        <NavBar />
        <div className="ui main text container segment">
          <div className="ui middle aligned center aligned grid">
            <div className="column">
              <Header>Login</Header>
              <Form size="large" onSubmit={this.doSubmit}>
                <Form.Field>
                  <Input
                    name="email"
                    label={{ basic: true, content: "@hrsdc-rhdcc.gc.ca" }}
                    labelPosition="right"
                    placeholder="Email"
                    onChange={this.handleChange}
                  />
                </Form.Field>
                <Form.Input
                  name="password"
                  fluid
                  icon="eye slash"
                  placeholder="Password"
                  type="password"
                  onChange={this.handleChange}
                />
                <Button primary>Login</Button>
              </Form>
              <div className="ui message">
                <Link to="/register">Sign up</Link>.
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default LoginForm;
