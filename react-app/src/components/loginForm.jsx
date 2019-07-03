import React from "react";
import { Redirect } from "react-router-dom";
import Joi from "joi-browser";
import Form from "./common/form";
import NavBar from "./common/navbar";
import auth from "../services/authService";

class LoginForm extends Form {
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

  doSubmit = async () => {
    try {
      const { data } = this.state;
      await auth.login(data.email, data.password);
      const { state } = this.props.location;
      window.location = state ? state.from.pathname : "/";
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        const errors = { ...this.state.errors };
        errors.username = ex.response.data;
        this.setState({ errors });
      }
    }
  };

  render() {
    //    if (auth.getCurrentUser()) return <Redirect to="/" />;

    return (
      <React.Fragment>
        <NavBar />
        <div className="ui main text container segment">
          <div className="ui middle aligned center aligned grid">
            <div className="column">
              <h1 className="ui header">Login</h1>
              <form className="ui large form" onSubmit={this.handleSubmit}>
                {this.renderInput("email", "Email")}
                {this.renderInput("password", "Password", "password")}
                {this.renderButton("Login")}
              </form>
              <div className="ui message">
                Or register <a href="#">here</a>.
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default LoginForm;
