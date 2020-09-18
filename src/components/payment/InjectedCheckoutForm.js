import React from "react";
import { ElementsConsumer } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";

export default function InjectedCheckoutForm({
  handleNext,
  handleBack,
  transaction,
}) {
  return (
    <ElementsConsumer>
      {({ stripe, elements }) => (
        <CheckoutForm
          stripe={stripe}
          elements={elements}
          handleNext={handleNext}
          handleBack={handleBack}
          transaction={transaction}
        />
      )}
    </ElementsConsumer>
  );
}
