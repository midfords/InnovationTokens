import React from "react";
import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <div className="ui fixed inverted menu">
      <div className="ui container">
        <Link className="header item" to="/">
          Innovation Tokens
        </Link>
        <Link className="item" to="/tokens">
          Tokens
        </Link>
        <Link className="item" to="/game">
          Game
        </Link>
        <Link className="item" to="/">
          About
        </Link>
      </div>
    </div>
  );
};

export default NavBar;
