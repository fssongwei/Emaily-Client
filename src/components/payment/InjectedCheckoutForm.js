import React from "react";
import { ElementsConsumer } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";

export default function InjectedCheckoutForm() {
  return (
    <ElementsConsumer>
      {({ stripe, elements }) => (
        <CheckoutForm stripe={stripe} elements={elements} />
      )}
    </ElementsConsumer>
  );
}
