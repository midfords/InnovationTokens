import React, { Component } from "react";
import {
  Form,
  Item,
  Input,
  Button,
  Popup,
  Grid,
  GridColumn,
  Search
} from "semantic-ui-react";
import _ from "lodash";
import Joi from "joi-browser";
import NavBar from "./common/navbar";
import auth from "../services/authService";
import http from "../services/httpService";
import { register } from "../services/userService";
import ProfilePic from "./common/profilePic";

class RegisterForm extends Component {
  state = {
    data: {
      first: "",
      last: "",
      email: "",
      password: "",
      confirm: "",
      profileId: "",
      managerId: ""
    },
    search: {
      isLoading: false,
      results: [],
      value: ""
    },
    isManager: false,
    errors: {}
  };

  schema = {
    first: Joi.string()
      .required()
      .label("First"),
    last: Joi.string()
      .required()
      .label("Last"),
    email: Joi.string()
      .required()
      .label("Email"),
    password: Joi.string()
      .min(5)
      .required()
      .label("Password"),
    confirm: Joi.string().label("Confirm"),
    profileId: Joi.number()
      .integer()
      .min(1)
      .max(8)
      .required()
      .label("ProfileId"),
    managerId: Joi.string()
      .label("ManagerId")
      .allow("")
  };

  handleResultSelect = (e, { result }) => {
    const state = { ...this.state };
    state.search.value = result.title;
    state.data.managerId = result.id;

    this.setState(state);
  };

  handleSearchChange = async (e, { value }) => {
    const search = { ...this.state.search };
    search.isLoading = true;
    search.value = value;

    this.setState({ search });

    http
      .get(`http://localhost:3900/api/users/managers?query=${value}`)
      .then(res => {
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

  handleCheckChange = (e, { checked }) => {
    const state = { ...this.state };
    state.isManager = checked;

    if (checked) {
      state.search.value = "";
      state.data.managerId = "";
    }

    this.setState(state);
  };

  handleImageSelect = key => {
    const data = { ...this.state.data };
    data.profileId = key;
    this.setState({ data });
  };

  validateProperty = ({ name, value }) => {
    const obj = { [name]: value };
    const schema = { [name]: this.schema[name] };
    const { error } = Joi.validate(obj, schema);
    return error ? error.details[0].message : null;
  };

  updateData = (k, v) => {
    const data = { ...this.state.data };
    data[k] = v;
    this.setState({ data });
  };

  doSubmit = async () => {
    if (!this.state.data.email.includes("@hrsdc-rhdcc.gc.ca"))
      this.state.data.email = `${this.state.data.email}@hrsdc-rhdcc.gc.ca`;

    const { errors } = Joi.validate(this.state.data, this.schema, {
      abortEarly: false
    });
    if (errors) {
      console.log(errors);

      this.setState({ errors });
      return;
    }

    try {
      const res = await register(this.state.data);
      auth.loginWithJwt(res.headers["x-auth-token"]);
      window.location = "/dashboard";
    } catch (ex) {
      if (ex.res && ex.res.status === 400) {
        const errors = { ...this.state.errors };
        errors.first = ex.res.data;
        this.setState({ errors });
      }
    }
  };

  render() {
    const { isManager, errors } = this.state;
    const { isLoading, value, results } = this.state.search;

    return (
      <React.Fragment>
        <div className="ui main text container eight column stackable aligned grid segment">
          <div className="ui middle aligned grid">
            <div className="column">
              <h1 className="ui centered header">
                Welcome to Innovation Tokens!
              </h1>
              <div className="ui centered aligned grid">
                Just a couple of things before you're ready to start innovating.
              </div>
              <br />
              <br />
              <Form onSubmit={this.doSubmit}>
                <Form.Group widths="equal">
                  <Form.Input
                    required
                    fluid
                    label="First Name"
                    placeholder="First name"
                    onChange={e => this.updateData("first", e.target.value)}
                    error={errors.first}
                  />
                  <Form.Input
                    fluid
                    required
                    label="Last Name"
                    placeholder="Last name"
                    onChange={e => this.updateData("last", e.target.value)}
                    error={errors.last}
                  />
                </Form.Group>
                <Form.Field required>
                  <label>Email</label>
                  <Input
                    label={{ basic: true, content: "@hrsdc-rhdcc.gc.ca" }}
                    labelPosition="right"
                    placeholder="Email"
                    onChange={e => this.updateData("email", e.target.value)}
                    error={errors.email}
                  />
                </Form.Field>
                <Form.Group widths="equal">
                  <Form.Input
                    required
                    fluid
                    type="password"
                    label="Password"
                    placeholder="Password"
                    onChange={e => this.updateData("password", e.target.value)}
                    error={errors.password}
                  />
                  <Form.Input
                    fluid
                    required
                    type="password"
                    label="Confirm"
                    placeholder="Confirm"
                    onChange={e => this.updateData("confirm", e.target.value)}
                    error={errors.confirm}
                  />
                </Form.Group>
                <Form.Field required error={errors.profile}>
                  <label>Profile Picture</label>
                  <Grid>
                    {_.range(1, 9).map(i => (
                      <GridColumn key={i} width="2">
                        <Item onClick={() => this.handleImageSelect(i)}>
                          <ProfilePic
                            id={i}
                            size="small"
                            disabled={i != this.state.data.profileId}
                          />
                        </Item>
                      </GridColumn>
                    ))}
                  </Grid>
                </Form.Field>
                <Form.Field
                  required
                  disabled={isManager}
                  error={errors.manager}
                >
                  <label>Manager</label>
                  <Popup
                    content="Find your manager by name or email. If you can't find your manager they might not be registered yet."
                    trigger={
                      <Search
                        className="field input"
                        placeholder="Manager's Name"
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
                <Form.Checkbox
                  inline
                  label="I am a manager."
                  onChange={this.handleCheckChange}
                />
                <Button
                  type="submit"
                  disabled={
                    !this.state.data.first ||
                    !this.state.data.last ||
                    !this.state.data.email ||
                    !this.state.data.password ||
                    !this.state.data.confirm ||
                    !this.state.data.profileId ||
                    (!this.state.isManager && !this.state.data.managerId)
                  }
                >
                  Sign up
                </Button>
              </Form>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default RegisterForm;
