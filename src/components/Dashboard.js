import React from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import InjectedCheckoutForm from "./payment/InjectedCheckoutForm";
import Container from "@material-ui/core/Container";
import { connect } from "react-redux";
import LinearProgress from "@material-ui/core/LinearProgress";
import history from "../history";

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY);

const Dashboard = ({ loadUser }) => {
  const [loading, user] = loadUser;
  if (loading) return <LinearProgress />;
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
  return { loadUser: state.user };
};

export default connect(mapStateToProps, null)(Dashboard);
