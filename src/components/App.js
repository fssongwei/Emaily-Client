import React, { useEffect } from "react";
import { Router, Route } from "react-router-dom";
import history from "../history";
import { fetchAuthStatus } from "../actions";
import { connect } from "react-redux";

import Header from "./Header";
import Landing from "./Landing";
import Login from "./Login";
import Dashboard from "./Dashboard";

const App = (props) => {
  useEffect(() => {
    props.fetchAuthStatus();
  }, []);

  return (
    <Router history={history}>
      <div>
        <Header />
        <Route path="/" exact component={Landing} />
        <Route path="/login" exact component={Login} />
        <Route path="/dashboard" exact component={Dashboard} />
      </div>
    </Router>
  );
};

const mapStateToProps = (state) => {
  return { user: state.auth };
};

export default connect(mapStateToProps, { fetchAuthStatus })(App);
