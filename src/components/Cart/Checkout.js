import React from "react";
import Container from "@material-ui/core/Container";
import CheckoutList from "./CheckoutList";
import AddressForm from "./AddressForm";

const CheckOut = () => {
  return (
    <Container style={{ maxWidth: "800px" }}>
      <div className="header">
        <h1>Check Out</h1>
        <hr />
      </div>

      <div className="checkoutList" style={{ marginBottom: "3em" }}>
        <h3>Your Order</h3>
        <CheckoutList />
      </div>

      <div className="checkoutList" style={{ marginBottom: "3em" }}>
        <h3>Shipping Address</h3>
        <AddressForm />
      </div>
    </Container>
  );
};

export default CheckOut;
