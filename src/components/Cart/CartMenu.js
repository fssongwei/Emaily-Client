import React, { useEffect, useRef } from "react";
import { connect } from "react-redux";

import Badge from "@material-ui/core/Badge";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import CartMenuItem from "./CartMenuItem";

const CartMenuList = React.forwardRef(({ cart }, ref) => {
  if (cart.length === 0) return null;
  return cart.map((item) => {
    return <CartMenuItem item={item} key={item.product._id} />;
  });
});

const CartMenu = ({ loadUser, cart }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const buttonEl = useRef(null);
  const [loading, user] = loadUser;

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    console.log(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    setAnchorEl(buttonEl.current);

    const timerID = setTimeout(() => {
      console.log("updated!");
    }, 10000);

    return () => {
      clearTimeout(timerID);
    };
  }, [cart]);

  if (loading || !user) return null;
  return (
    <>
      <IconButton
        edge="start"
        color="inherit"
        aria-label="menu"
        onClick={handleClick}
        ref={buttonEl}
      >
        <Badge
          badgeContent={cart.length}
          color="primary"
          invisible={cart.length <= 0}
        >
          <ShoppingCartIcon />
        </Badge>
      </IconButton>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <CartMenuList cart={cart} />
        {!cart || cart.length === 0 ? (
          <MenuItem style={{ padding: "3em" }}>
            Your shopping cart is empty
          </MenuItem>
        ) : (
          <MenuItem>
            <Button variant="contained" color="primary" fullWidth>
              check out
            </Button>
          </MenuItem>
        )}
      </Menu>
    </>
  );
};

const mapStateToProps = (state) => {
  return { loadUser: state.user, cart: state.cart };
};

export default connect(mapStateToProps, null)(CartMenu);
