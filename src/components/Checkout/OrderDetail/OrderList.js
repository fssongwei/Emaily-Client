import React from "react";

import List from "@material-ui/core/List";
import CartMenuItem from "../../Cart/CartMenuItem";
import Typography from "@material-ui/core/Typography";

const OrderList = ({ cart }) => {
  if (cart === null || cart === undefined) return null;
  if (cart.length === 0) return <p>Your cart is empty</p>;
  let totalPrice = 0;
  for (let item of cart) totalPrice += item.amount * item.product.price;

  return (
    <div>
      <List>
        {cart.map((item, id) => {
          return <CartMenuItem item={item} key={id} />;
        })}
      </List>
      <hr />
      <div style={{ textAlign: "right" }}>
        <Typography variant="h5" gutterBottom>
          Total: ${totalPrice}
        </Typography>
      </div>
    </div>
  );
};

export default OrderList;
