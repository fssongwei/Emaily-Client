import React, { useState, useEffect } from "react";
import { connect } from "react-redux";

import Button from "@material-ui/core/Button";
import List from "@material-ui/core/List";
import CartMenuItem from "./CartMenuItem";

const CheckoutList = ({ cart }) => {
  const [canPay, setCanPay] = useState(true);

  useEffect(() => {
    if (cart === null) return;
    setCanPay(true);
    for (let item of cart) {
      if (item.amount > item.product.quantity) {
        setCanPay(false);
        break;
      }
    }
  }, [cart]);

  if (cart === null) return null;
  if (cart.length === 0) return <p>Your cart is empty</p>;
  let totalPrice = 0;
  for (let item of cart) totalPrice += item.amount * item.product.price;

  return (
    <div>
      <List>
        {cart.map((item, id) => {
          return <CartMenuItem item={item} key={id} setCanPay={setCanPay} />;
        })}
      </List>
      <hr />
      <div style={{ textAlign: "right" }}>
        <h2>Total: ${totalPrice}</h2>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return { cart: state.cart };
};

export default connect(mapStateToProps, null)(CheckoutList);
