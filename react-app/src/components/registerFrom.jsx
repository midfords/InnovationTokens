import React from "react";
import { Form, Checkbox, Button } from "semantic-ui-react";
import Joi from "joi-browser";
import NavBar from "./common/navbar";
import auth from "../services/authService";

class RegisterFrom extends Form {
  state = {
    data: { username: "", email: "", password: "" },
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
        {/* <div className="ui main text container segment">
          <div className="ui aligned grid">
            <div className="column">
              <h1 className="ui centered header">Sign up</h1>
              <Form>
                <Form.Field>
                  <label>First Name</label>
                  <input placeholder="First Name" />
                </Form.Field>
                <Form.Field>
                  <label>Last Name</label>
                  <input placeholder="Last Name" />
                </Form.Field>
                <Form.Field>
                  <Checkbox label="I agree to the Terms and Conditions" />
                </Form.Field>
                <Button type="submit">Submit</Button>
              </Form>
            </div>
          </div>
        </div> */}
      </React.Fragment>
    );
  }
}

export default RegisterFrom;
