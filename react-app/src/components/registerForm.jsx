import React, { Component } from "react";
import {
  Form,
  Item,
  Input,
  Button,
  Popup,
  Grid,
  GridColumn,
  Search,
  Message
} from "semantic-ui-react";
import _ from "lodash";
import Joi from "joi-browser";
import NavBar from "./common/navbar";
import auth from "../services/authService";
import userService from "../services/userService";
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
    errors: {},
    formError: ""
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

  validate = () => {
    const errors = {};
    const { error } = Joi.validate(this.state.data, this.schema, {
      abortEarly: false
    });

    if (!error) return errors;

    for (let item of error.details) errors[item.path[0]] = item.message;
    return errors;
  };

  handleResultSelect = (e, { result }) => {
    const state = { ...this.state };
    state.search.value = result.title;
    state.data.managerId = result.id;

    this.setState(state);
  };

  validateProperty = (name, value) => {
    const obj = { [name]: value };
    const schema = { [name]: this.schema[name] };
    const { error } = Joi.validate(obj, schema);
    return error ? error.details[0].message : null;
  };

  handleSearchChange = async (e, { value }) => {
    let search = { ...this.state.search };
    search.isLoading = true;
    search.value = value;

    this.setState({ search });

    userService.managerLookup(value).then(res => {
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
    if (!this.state.data.email.includes("@hrsdc-rhdcc.gc.ca"))
      this.state.data.email = `${this.state.data.email}@hrsdc-rhdcc.gc.ca`;

    const errors = this.validate();
    this.setState({ errors });
    if (!_.isEmpty(errors)) return;

    try {
      const res = await userService.register(this.state.data);
      auth.loginWithJwt(res.headers["x-auth-token"]);
      window.location = "/dashboard";
    } catch (ex) {
      console.log(ex);
      console.log(ex.response);

      if (ex.response && ex.response.status === 400) {
        const formError = ex.response.data;
        console.log(formError);

        this.setState({ formError });
      }
    }
  };

  render() {
    const { isManager, errors, formError } = this.state;
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
              {formError && (
                <Message error header="Registration error" list={[formError]} />
              )}
              <Form onSubmit={this.doSubmit}>
                <Form.Group widths="equal">
                  <Form.Input
                    required
                    fluid
                    name="first"
                    label="First Name"
                    placeholder="First name"
                    onChange={this.handleChange}
                    error={errors.first}
                  />
                  <Form.Input
                    fluid
                    required
                    name="last"
                    label="Last Name"
                    placeholder="Last name"
                    onChange={this.handleChange}
                    error={errors.last}
                  />
                </Form.Group>
                <Form.Field required>
                  <label>Email</label>
                  <Form.Input error={errors.email}>
                    <Input
                      name="email"
                      label={{ basic: true, content: "@hrsdc-rhdcc.gc.ca" }}
                      labelPosition="right"
                      placeholder="Email"
                      onChange={this.handleChange}
                    />
                  </Form.Input>
                </Form.Field>
                <Form.Group widths="equal">
                  <Form.Input
                    required
                    fluid
                    name="password"
                    type="password"
                    label="Password"
                    placeholder="Password"
                    onChange={this.handleChange}
                    error={errors.password}
                  />
                  <Form.Input
                    fluid
                    required
                    name="confirm"
                    type="password"
                    label="Confirm"
                    placeholder="Confirm"
                    onChange={this.handleChange}
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
