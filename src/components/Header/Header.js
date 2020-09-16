import React from "react";
import { Link } from "react-router-dom";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import ShoppingBasketIcon from "@material-ui/icons/ShoppingBasket";
import HeaderMenu from "./HeaderMenu";
import CartMenu from "../Cart/CartMenu";

const Header = () => {
  return (
    <div>
      <AppBar position="static" style={{ backgroundColor: "steelblue" }}>
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            component={Link}
            to="/"
          >
            <ShoppingBasketIcon fontSize="large" />
          </IconButton>
          <Typography variant="h6" style={{ flexGrow: 1 }}>
            iShop
          </Typography>
          <CartMenu />
          <HeaderMenu />
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Header;
