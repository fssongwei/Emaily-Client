import React from "react";
import { connect } from "react-redux";
import history from "../../history";

import Container from "@material-ui/core/Container";
import LinearProgress from "@material-ui/core/LinearProgress";
import BuyList from "./BuyList";
import Typography from "@material-ui/core/Typography";

const SellDashboard = ({ loadUser }) => {
  const [loadingUser, user] = loadUser;
  if (loadingUser) return <LinearProgress />;
  if (!user) history.push("/");

  return (
    <Container>
      <div style={{ margin: "2em 0" }}>
        <Typography variant="h4" gutterBottom>
          Welcome, {user.name}
        </Typography>
      </div>

      <div style={{ margin: "2em 0" }}>
        <Typography variant="h5" gutterBottom>
          Your Purchases
        </Typography>
        <BuyList />
      </div>
    </Container>
  );
};

const mapStateToProps = (state) => {
  return { loadUser: state.user };
};

export default connect(mapStateToProps, null)(SellDashboard);
