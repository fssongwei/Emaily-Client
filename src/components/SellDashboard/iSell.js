import React from "react";
import { connect } from "react-redux";
import history from "../../history";

import Container from "@material-ui/core/Container";
import LinearProgress from "@material-ui/core/LinearProgress";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import { Link } from "react-router-dom";
import ProductList from "../Products/ProductList";
import SellList from "./SellList";

const iSell = ({ loadUser }) => {
  const [loadingUser, user] = loadUser;
  if (loadingUser) return <LinearProgress />;
  if (!user) history.push("/");
  const query = { owner: user._id };

  return (
    <Container>
      <h2>Welcome, {user.name} </h2>
      <Button
        component={Link}
        to="/iSell/createProduct"
        color="primary"
        variant="contained"
      >
        Create Product
      </Button>

      <h3>Your Sell</h3>
      <SellList />

      <h3>Your Listings</h3>
      <Grid container spacing={3}>
        <ProductList query={query} />
      </Grid>
    </Container>
  );
};

const mapStateToProps = (state) => {
  return { loadUser: state.user };
};

export default connect(mapStateToProps, null)(iSell);
