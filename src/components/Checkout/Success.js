import React from "react";
import { Link } from "react-router-dom";
import CheckCircleOutlineIcon from "@material-ui/icons/CheckCircleOutline";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

const Success = () => {
  return (
    <div
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <CheckCircleOutlineIcon
        style={{ fontSize: "3em", marginTop: "1em" }}
        color="primary"
      />
      <div style={{ margin: "1em" }}>
        <Typography variant="h5" gutterBottom>
          Your payment has been successfully process!
        </Typography>
      </div>
      <Button
        component={Link}
        to="/ibuy"
        variant="contained"
        color="primary"
        style={{ margin: "2em" }}
      >
        Go to iBuy center
      </Button>
    </div>
  );
};

export default Success;
