import React from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

import { makeStyles } from "@material-ui/core/styles";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Container from "@material-ui/core/Container";

import OrderDetail from "./OrderDetail/Index";
import InjectedCheckoutForm from "./InjectedCheckoutForm";
import Success from "./Success";

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY);

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  backButton: {
    marginRight: theme.spacing(1),
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
}));

function getSteps() {
  return ["Order Detail", "Payment Info", "Success"];
}

function getStepContent(
  stepIndex,
  handleNext,
  handleBack,
  transaction,
  setTransaction
) {
  switch (stepIndex) {
    case 0:
      return (
        <OrderDetail handleNext={handleNext} setTransaction={setTransaction} />
      );
    case 1:
      return (
        <Elements stripe={stripePromise}>
          <InjectedCheckoutForm
            handleNext={handleNext}
            handleBack={handleBack}
            transaction={transaction}
          />
        </Elements>
      );
    case 2:
      return <Success />;
    default:
      return "Unknown stepIndex";
  }
}

const CheckOut = () => {
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  const [transaction, setTransaction] = React.useState({});
  const steps = getSteps();

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  return (
    <div className={classes.root}>
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <Container style={{ maxWidth: "800px" }}>
        <div>
          {getStepContent(
            activeStep,
            handleNext,
            handleBack,
            transaction,
            setTransaction
          )}
        </div>
      </Container>
    </div>
  );
};

export default CheckOut;
