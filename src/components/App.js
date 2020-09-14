import React, { useEffect } from "react";
import { Router, Route } from "react-router-dom";
import history from "../history";
import { fetchAuthStatus } from "../actions";
import { connect } from "react-redux";

import Header from "./Header/Header";
import Landing from "./Landing";
import Login from "./Login";
import Dashboard from "./Dashboard";
import SellDashboard from "./SellDashboard/SellDashboard";
import CreateProduct from "./Products/ProductCreate";
import ProductDetail from "./Products/ProductDetail";
import ProductEdit from "./Products/ProductEdit";
import Message from "./Message";

const App = (props) => {
  useEffect(() => {
    props.fetchAuthStatus();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Router history={history}>
      <div>
        <Header />
        <Message />
        <Route path="/" exact component={Landing} />
        <Route path="/login" exact component={Login} />
        <Route path="/dashboard" exact component={Dashboard} />

        <Route path="/iSell" exact component={SellDashboard} />
        <Route path="/iSell/createProduct" exact component={CreateProduct} />
        <Route path="/products/:id" exact component={ProductDetail} />
        <Route path="/products/edit/:id" exact component={ProductEdit} />
      </div>
    </Router>
  );
};

const mapStateToProps = (state) => {
  return { user: state.auth };
};

export default connect(mapStateToProps, { fetchAuthStatus })(App);
