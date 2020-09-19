import React, { useState, useEffect } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import axios from "axios";
import history from "../../history";
import "./CheckoutForm.css";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";

const CheckoutForm = ({ handleNext, handleBack, transaction }) => {
  const [succeeded, setSucceeded] = useState(false);
  const [error, setError] = useState(null);
  const [processing, setProcessing] = useState("");
  const [disabled, setDisabled] = useState(true);
  const [clientSecret, setClientSecret] = useState("");
  const [totalPrice, setTotalPrice] = useState(0);
  const stripe = useStripe();
  const elements = useElements();

  useEffect(() => {
    if (!transaction) history.push("/");
    console.log(transaction);
  }, [transaction]);

  useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    const fetchClientSecret = async () => {
      const response = await axios.post(
        `${process.env.REACT_APP_API_BASE_URL}/payment`,
        transaction
      );
      const { client_secret, totalPrice } = response.data;
      setClientSecret(client_secret);
      setTotalPrice(totalPrice);
    };
    fetchClientSecret();
  }, [transaction]);

  useEffect(() => {
    if (succeeded) handleNext();
  }, [succeeded, handleNext]);

  const cardStyle = {
    style: {
      base: {
        color: "#32325d",
        fontFamily: "Arial, sans-serif",
        fontSmoothing: "antialiased",
        fontSize: "16px",
        "::placeholder": {
          color: "#32325d",
        },
      },
      invalid: {
        color: "#fa755a",
        iconColor: "#fa755a",
      },
    },
  };

  const handleChange = async (event) => {
    // Listen for changes in the CardElement
    // and display any errors as the customer types their card details
    setDisabled(event.empty);
    setError(event.error ? event.error.message : "");
  };

  const handleSubmit = async (ev) => {
    ev.preventDefault();
    setProcessing(true);

    const payload = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
      },
    });

    if (payload.error) {
      setError(`Payment failed ${payload.error.message}`);
      setProcessing(false);
    } else {
      setError(null);
      setProcessing(false);
      setSucceeded(true);
    }
  };

  if (!clientSecret)
    return (
      <div style={{ display: "flex", justifyContent: "center" }}>
        <CircularProgress style={{ margin: "0 auto" }} />
      </div>
    );

  return (
    <form id="payment-form" onSubmit={handleSubmit}>
      <h1>Pay: ${totalPrice} </h1>
      <CardElement
        id="card-element"
        options={cardStyle}
        onChange={handleChange}
      />
      <Button
        variant="contained"
        color="primary"
        disabled={processing || disabled || succeeded}
        id="submit"
        fullWidth
        type="submit"
      >
        {processing ? <CircularProgress size="2em" /> : "Pay"}
      </Button>
      {/* Show any error that happens when processing the payment */}
      {error && (
        <div className="card-error" role="alert">
          {error}
        </div>
      )}
      <Button onClick={handleBack}>Back</Button>
    </form>
  );
};

export default CheckoutForm;
