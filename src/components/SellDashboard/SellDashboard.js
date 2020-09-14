import React from "react";
import useUser from "../../hooks/useUser";
import history from "../../history";

import Container from "@material-ui/core/Container";
import LinearProgress from "@material-ui/core/LinearProgress";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";

const SellDashboard = () => {
  const [loading, user] = useUser();
  if (loading) return <LinearProgress />;
  if (!user) history.push("/");

  return (
    <Container>
      <h1>Welcome, {user.name} </h1>
      <h1>This is sell management dashboard</h1>

      <Button component={Link} to="/iSell/createProduct">
        Create Product
      </Button>
    </Container>
  );
};

export default SellDashboard;
