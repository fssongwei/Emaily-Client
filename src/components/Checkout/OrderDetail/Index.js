import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import history from "../../../history";

import OrderList from "./OrderList";
import AddressForm from "./AddressForm";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

const onComfirm = (address, cart, handleNext, setTransaction) => {
  // create transaction
  let transaction = {};
  transaction.address = address;
  transaction.orders = [];
  for (let item of cart) {
    let product = {};
    product.productId = item.product._id;
    product.name = item.product.name;
    product.price = item.product.price;
    product.pic = item.product.pics[0];
    let order = {};
    order.amount = item.amount;
    order.product = product;
    transaction.orders.push(order);
  }
  setTransaction(transaction);
  handleNext();
};

const OrderDetail = ({ address, cart, handleNext, setTransaction }) => {
  const [disableButton, setDisableButton] = useState(true);

  useEffect(() => {
    if (cart === null) return;
    if (cart.length === 0) history.push("/");
    if (
      !address ||
      !address.firstName ||
      !address.lastName ||
      !address.address1 ||
      !address.city ||
      !address.state ||
      !address.zip ||
      !address.country
    )
      return;
    setDisableButton(false);
    for (let item of cart) {
      if (item.amount > item.product.quantity) {
        setDisableButton(true);
        break;
      }
    }
  }, [address, cart]);

  return (
    <>
      <div style={{ marginBottom: "3em" }}>
        <Typography variant="h5" gutterBottom>
          Shipping Address
        </Typography>
        <AddressForm />
      </div>

      <div style={{ marginBottom: "1em" }}>
        <Typography variant="h5" gutterBottom>
          Your Order
        </Typography>
        <OrderList cart={cart} />
      </div>

      <div
        style={{
          marginBottom: "3em",
          display: "flex",
          justifyContent: "flex-end",
        }}
      >
        <Button
          variant="contained"
          color="primary"
          onClick={() => onComfirm(address, cart, handleNext, setTransaction)}
          disabled={disableButton}
        >
          Comfirm
        </Button>
      </div>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    cart: state.cart,
    address: state.form.address ? state.form.address.values : null,
  };
};

export default connect(mapStateToProps, null)(OrderDetail);
