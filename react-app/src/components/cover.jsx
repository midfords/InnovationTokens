import React, { Component } from "react";

class Cover extends Component {
  render() {
    return (
      <div className="pusher">
        <div className="ui inverted vertical banner-img masthead center aligned segment">
          <div className="ui container">
            <div className="ui large secondary inverted pointing menu">
              <a href="" className="toc item">
                <i className="sidebar icon" />
              </a>
              <a href="/" className="active item">
                Home
              </a>
              <a href="/" className="item">
                Wallet
              </a>
              <a href="/" className="item">
                About
              </a>
              <div className="right item">
                <a href="/" className="ui inverted button">
                  Log in
                </a>
                <a href="/" className="ui inverted button">
                  Sign Up
                </a>
              </div>
            </div>
          </div>
          <div className="ui text container">
            <h1 className="ui inverted header">Innovation Tokens</h1>
            <h2> Spend time. </h2>
            <a href="/dashboard" className="ui huge primary button">
              Go to Innovation Tokens
            </a>
          </div>
        </div>
        <div className="ui vertical stripe segment">
          <div className="ui middle aligned stackable grid container">
            <div className="row">
              <div className="eight wide column">
                <h3 className="ui header"> About</h3>
                <p>
                  Innovation tokens is a program to encourage teams to innovate.
                  It lets developers find time and track their work. It's fun
                  and easy to get started.
                </p>
                <p>
                  To get started, sign up your team and share with your
                  developers!
                </p>
                <h3 className="ui header"> Why Join?</h3>
                <p>
                  Constantly learn new technologies and grow as a developer.
                </p>
                <p>Work on what interests you the most.</p>
                <p>
                  Earn tokens by completing achievements and compete with
                  others.
                </p>
              </div>
              <div className="six wide right floated column">
                <img src="/token.png" className="ui medium image" />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Cover;
