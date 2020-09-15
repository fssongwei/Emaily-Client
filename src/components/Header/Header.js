import React from "react";

import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import HeaderStatus from "./HeaderMenu";

import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { logOut } from "../../actions";

const useStyles = makeStyles((theme) => ({
  appBar: {
    backgroundColor: "steelblue",
  },
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(1),
  },
  title: {
    flexGrow: 1,
  },
}));

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
            <ShoppingCartIcon fontSize="large" />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            iShop
          </Typography>
          <HeaderStatus />
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default connect(null, { logOut })(Header);
