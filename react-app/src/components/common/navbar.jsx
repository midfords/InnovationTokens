import React from "react";
import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <div className="ui inverted menu">
      <div className="ui container">
        <Link className="header item" to="/">
          Innovation Tokens
        </Link>
        <Link className="item" to="/dashboard">
          Dashboard
        </Link>
      </div>
    </div>
  );
};

export default NavBar;
