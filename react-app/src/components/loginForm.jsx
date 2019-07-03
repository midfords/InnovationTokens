import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { Button, Form, Header, Input } from "semantic-ui-react";
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

  doSubmit = async () => {};

  render() {
    if (auth.getCurrentUser()) return <Redirect to="/dashboard" />;

    return (
      <React.Fragment>
        <NavBar />
        <div className="ui main text container segment">
          <div className="ui middle aligned center aligned grid">
            <div className="column">
              <Header>Login</Header>
              <Form size="large">
                <Form.Field>
                  <Input
                    label={{ basic: true, content: "@hrsdc-rhdcc.gc.ca" }}
                    labelPosition="right"
                    placeholder="Email"
                  />
                </Form.Field>
                <Form.Input
                  fluid
                  icon="eye slash"
                  iconPosition="right"
                  placeholder="Password"
                  type="password"
                />
                <Button primary>Login</Button>
              </Form>
              <div className="ui message">
                <a href="#">Sign up</a>.
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default LoginForm;
