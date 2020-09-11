import React, { useEffect } from "react";
import Container from "@material-ui/core/Container";
import { connect } from "react-redux";
import { fetchAuthStatus } from "../../actions";
import LinearProgress from "@material-ui/core/LinearProgress";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";

import history from "../../history";

const SellDashboard = (props) => {
  useEffect(() => {
    props.fetchAuthStatus();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (props.user === null) return <LinearProgress />;
  if (!props.user) history.push("/");

  return (
    <Container>
      <h1>Welcome, {props.user.name} </h1>
      <h1>This is sell management dashboard</h1>

      <Button component={Link} to="/iSell/createProduct">
        Create Product
      </Button>
    </Container>
  );
};

const mapStateToProps = (state) => {
  return { user: state.auth };
};

export default connect(mapStateToProps, { fetchAuthStatus })(SellDashboard);
