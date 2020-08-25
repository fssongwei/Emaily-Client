import React from "react";

import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import DraftsIcon from "@material-ui/icons/Drafts";

import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { logOut } from "../actions";

const useStyles = makeStyles((theme) => ({
  appBar: {
    backgroundColor: "steelblue",
  },
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

const renderButtons = (user, logOut) => {
  if (user === null) return;
  if (!user.isLogin)
    return (
      <Button color="inherit" component={Link} to="/login">
        Login
      </Button>
    );

  let welcomeText = user.profile.displayName
    ? `Welcome, ${user.profile.displayName}`
    : "";

  return (
    <>
      <label style={{ paddingRight: "1em" }}>{welcomeText} </label>
      <Button color="inherit" component={Link} to="/dashboard">
        Dashboard
      </Button>
      <Button color="inherit" onClick={logOut}>
        Logout
      </Button>
    </>
  );
};

const Header = (props) => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <AppBar position="static" className={classes.appBar}>
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
            component={Link}
            to="/"
          >
            <DraftsIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            Emaily
          </Typography>
          {renderButtons(props.user, props.logOut)}
        </Toolbar>
      </AppBar>
    </div>
  );
};

const mapStateToProps = (state) => {
  return { user: state.auth };
};

export default connect(mapStateToProps, { logOut })(Header);
