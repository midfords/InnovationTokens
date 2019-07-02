import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Footer from "./components/common/footer";
import Cover from "./components/cover";
import LoginForm from "./components/loginForm";
import Dashboard from "./components/dashboard";
import "semantic-ui-css/semantic.min.css";
import "semantic-ui-react";
import "./App.css";

function App() {
  return (
    <React.Fragment>
      <div className="container">
        <Switch>
          <Route path="/login" component={LoginForm} />
          <Route path="/cover" component={Cover} />
          <Route path="/dashboard" component={Dashboard} />
          <Redirect from="/" to="/cover" />
        </Switch>
      </div>
      <Footer />
    </React.Fragment>
  );
}

export default App;
