import React, { useEffect, useRef } from "react";
import { connect } from "react-redux";
import { updateCart } from "./CartHooks";
import { fetchCartItems } from "../../actions";

import Badge from "@material-ui/core/Badge";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import CartMenuItem from "./CartMenuItem";
import { Link } from "react-router-dom";

const CartMenuList = React.forwardRef(({ cart }, ref) => {
  if (cart.length === 0) return null;
  return cart.map((item) => {
    return <CartMenuItem item={item} key={item.product._id} />;
  });
});

const CartMenu = ({ loadUser, cart, fetchCartItems }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const buttonEl = useRef(null);
  const [loading, user] = loadUser;

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    if (cart === null) return;
    // setAnchorEl(buttonEl.current);
    const update = (cartItems) => updateCart(cartItems);
    const timerID = setTimeout(() => {
      const cartItems = cart.map((item) => {
        return {
          productId: item.product._id,
          amount: item.amount,
        };
      });
      update(cartItems);
    }, 5000);

    return () => {
      clearTimeout(timerID);
    };
  }, [cart]);

  if (cart === null) {
    fetchCartItems();
    return null;
  }

  if (loading || !user) return null;
  return (
    <>
      <IconButton
        edge="start"
        color="inherit"
        aria-label="menu"
        onClick={handleClick}
        ref={buttonEl}
        style={{ margin: "0 1em" }}
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
            <Button
              variant="contained"
              color="primary"
              fullWidth
              component={Link}
              to="/checkout"
              onClick={handleClose}
            >
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

export default connect(mapStateToProps, { fetchCartItems })(CartMenu);
