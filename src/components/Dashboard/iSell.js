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
import Typography from "@material-ui/core/Typography";

const iSell = ({ loadUser }) => {
  const [loadingUser, user] = loadUser;
  if (loadingUser) return <LinearProgress />;
  if (!user) history.push("/");
  const query = { owner: user._id };

  return (
    <Container>
      <div style={{ margin: "2em 0" }}>
        <Typography variant="h4" gutterBottom>
          Welcome, {user.name}
        </Typography>
        <Button
          component={Link}
          to="/iSell/createProduct"
          color="primary"
          variant="contained"
        >
          Create Product
        </Button>
      </div>

      <div style={{ margin: "2em 0" }}>
        <Typography variant="h5" gutterBottom>
          Your Sell
        </Typography>
        <SellList />
      </div>

      <div style={{ margin: "2em 0" }}>
        <Typography variant="h5" gutterBottom style={{ marginTop: "2em" }}>
          Your Listings
        </Typography>
        <Grid container spacing={3}>
          <ProductList query={query} />
        </Grid>
      </div>
    </Container>
  );
};

const mapStateToProps = (state) => {
  return { loadUser: state.user };
};

export default connect(mapStateToProps, null)(iSell);
