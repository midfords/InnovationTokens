import React, { Component } from "react";
import {
  Form,
  Item,
  Input,
  Button,
  Image,
  Grid,
  GridColumn,
  Search
} from "semantic-ui-react";
import _ from "lodash";
import Joi from "joi-browser";
import NavBar from "./common/navbar";
import auth from "../services/authService";
import http from "../services/httpService";
import ProfilePic from "./common/profilePic";

class RegisterForm extends Component {
  state = {
    data: {
      first: "",
      last: "",
      email: "",
      password: "",
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
          title: i.name,
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

  doSubmit = async () => {};

  render() {
    const { isManager } = this.state;
    const { isLoading, value, results } = this.state.search;

    return (
      <React.Fragment>
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
                <Form.Field required disabled={isManager}>
                  <label>Manager</label>
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
                </Form.Field>
                <Form.Checkbox
                  inline
                  label="I am a manager."
                  onChange={this.handleCheckChange}
                />
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
