import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1, 0, 1),
    textTransform: "none",
  },
  icon: {
    paddingRight: "1em",
  },
  google: {
    backgroundColor: "#4285F4",
  },
  facebook: {
    backgroundColor: "#4267B2",
  },
}));

const OAuthPanel = () => {
  const classes = useStyles();

  return (
    <div style={{ marginTop: "2em" }}>
      <div style={{ textAlign: "center", margin: "1em" }}>or you can</div>
      <Button
        type="submit"
        fullWidth
        variant="contained"
        color="primary"
        className={`${classes.button} ${classes.google}`}
        href={`${process.env.REACT_APP_API_BASE_URL}/auth/google `}
      >
        <i className={`fab fa-google ${classes.icon}`}></i>
        Sign in with Google
      </Button>
      <Button
        type="submit"
        fullWidth
        variant="contained"
        color="primary"
        className={`${classes.button} ${classes.facebook}`}
        href={`${process.env.REACT_APP_API_BASE_URL}/auth/facebook `}
      >
        <i className={`fab fa-facebook-f ${classes.icon}`}></i>
        Sign in with Facebook
      </Button>
    </div>
  );
};

export default OAuthPanel;
