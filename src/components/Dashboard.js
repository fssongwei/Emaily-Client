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

const Dashboard = ({ user, fetchAuthStatus }) => {
  useEffect(() => {
    fetchAuthStatus();
  }, [fetchAuthStatus]);

  if (user === null) return <LinearProgress />;
  if (!user) history.push("/");

  return (
    <Container>
      <h1>Welcome, {user.name} </h1>
      <div>current balance: {user ? user.balance : ""}</div>
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
