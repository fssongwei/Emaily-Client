import React from "react";
import { connect } from "react-redux";
import history from "../../history";

import Container from "@material-ui/core/Container";
import LinearProgress from "@material-ui/core/LinearProgress";
import BuyList from "./BuyList";

const SellDashboard = ({ loadUser }) => {
  const [loadingUser, user] = loadUser;
  if (loadingUser) return <LinearProgress />;
  if (!user) history.push("/");

  return (
    <Container>
      <h2>Welcome, {user.name} </h2>

      <h3>Your Purchases</h3>
      <BuyList />
    </Container>
  );
};

const mapStateToProps = (state) => {
  return { loadUser: state.user };
};

export default connect(mapStateToProps, null)(SellDashboard);
