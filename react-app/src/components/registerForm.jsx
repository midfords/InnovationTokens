import React, { Component } from "react";
import { Form, Input, Button, Image } from "semantic-ui-react";
import Joi from "joi-browser";
import NavBar from "./common/navbar";
import auth from "../services/authService";

class RegisterForm extends Component {
  state = {
    data: { first: "", last: "", email: "", password: "" },
    errors: {}
  };

  schema = {
    email: Joi.string()
      .email()
      .required()
      .label("Email"),
    password: Joi.string()
      .min(5)
      .required()
      .label("Password"),
    name: Joi.string()
      .required()
      .label("Name")
  };

  doSubmit = async () => {};

  render() {
    return (
      <React.Fragment>
        <NavBar />
        <div className="ui main text container segment">
          <div className="ui aligned grid">
            <div className="column">
              <h1 className="ui centered header">Sign up</h1>
              <Form>
                <Form.Group widths="equal">
                  <Form.Input
                    required
                    fluid
                    label="First Name"
                    placeholder="First name"
                  />
                  <Form.Input
                    fluid
                    required
                    label="Last Name"
                    placeholder="Last name"
                  />
                </Form.Group>
                <Form.Field required>
                  <label>Email</label>
                  <Input
                    label={{ basic: true, content: "@hrsdc-rhdcc.gc.ca" }}
                    labelPosition="right"
                    placeholder="Email"
                  />
                </Form.Field>
                <Form.Group widths="equal">
                  <Form.Input
                    required
                    fluid
                    label="Password"
                    placeholder="Password"
                  />
                  <Form.Input
                    fluid
                    required
                    label="Confirm"
                    placeholder="Confirm"
                  />
                </Form.Group>
                <Form.Field required>
                  <label>Manager</label>
                  <Form.Input required placeholder="Manager's name" />
                </Form.Field>
                <Form.Checkbox inline label="I am a manager." />
                <Button type="submit">Sign up</Button>
              </Form>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default RegisterForm;
