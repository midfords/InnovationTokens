import React from "react";

const Footer = () => {
  return (
    <div className="ui inverted vertical footer segment">
      <div className="ui center aligned container">
        <div className="ui stackable inverted divided grid">
          <div className="eight wide column">
            <h4 className="ui inverted header"> Navigation</h4>
            <div className="ui inverted link list">
              <a href="" className="item">
                About
              </a>
              <a href="" className="item">
                Login
              </a>
              <a href="" className="item">
                Register
              </a>
              <a href="" className="item">
                Leaderboards
              </a>
            </div>
          </div>
          <div className="eight wide column">
            <h4 className="ui inverted header"> Contact Us</h4>
            <p> For help, contact</p>
            <p> innovation.tokens@hrsdc-rhdcc.gc.ca</p>
          </div>
        </div>
        <div className="ui inverted section divider" />
        <div className="ui horizontal inverted small divided link list">
          <br />
          <h5> Innovation Tokens 2019</h5>
        </div>
      </div>
    </div>
  );
};

export default Footer;
