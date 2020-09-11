import React, { useEffect } from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import InjectedCheckoutForm from "./payment/InjectedCheckoutForm";
import Container from "@material-ui/core/Container";
import { connect } from "react-redux";
import { fetchAuthStatus } from "../actions";
import LinearProgress from "@material-ui/core/LinearProgress";
import history from "../history";

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY);

const Dashboard = (props) => {
  useEffect(() => {
    props.fetchAuthStatus();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (props.user === null) return <LinearProgress />;
  if (!props.user) history.push("/");

  return (
    <Container>
      <h1>Welcome, {props.user.name} </h1>

      <div>current balance: {props.user ? props.user.balance : ""}</div>

      <Elements stripe={stripePromise}>
        <InjectedCheckoutForm />
      </Elements>
    </Container>
  );
};

const mapStateToProps = (state) => {
  return { user: state.auth };
};

export default connect(mapStateToProps, { fetchAuthStatus })(Dashboard);
