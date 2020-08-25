import React from "react";
import { CardElement } from "@stripe/react-stripe-js";
import axios from "axios";
import { connect } from "react-redux";

import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import CircularProgress from "@material-ui/core/CircularProgress";

class CheckoutForm extends React.Component {
  state = { errMsg: "", open: false, hasPaid: false, loading: false };
  handleSubmit = async (event) => {
    event.preventDefault();
    const { stripe, elements } = this.props;
    this.setState({ loading: true });

    if (!stripe || !elements) return;

    const res = await axios.get(
      `${process.env.REACT_APP_API_BASE_URL}/payment`
    );
    const clientSecret = res.data.client_secret;

    const result = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
        billing_details: {
          name: this.props.user._id,
        },
      },
    });

    if (result.error) {
      // Show error to your customer (e.g., insufficient funds)
      console.log(result.error);
      this.setState({ errMsg: result.error.message });
    } else {
      // The payment has been processed!
      if (result.paymentIntent.status === "succeeded") {
        console.log("payment succeed");
        this.setState({ hasPaid: true });
      }
    }
    this.setState({ loading: false });
  };

  renderForm = () => {
    return (
      <form onSubmit={this.handleSubmit}>
        <DialogTitle id="max-width-dialog-title">Add credit: $5</DialogTitle>
        <DialogContent>
          <DialogContentText>Credit or Debit card</DialogContentText>
          <CardElement />

          <DialogContentText>{this.state.errMsg}</DialogContentText>
        </DialogContent>
        {this.state.loading && (
          <DialogContent style={{ textAlign: "center" }}>
            <CircularProgress style={{ padding: "1em" }} />
            <DialogContentText>Payment processing ...</DialogContentText>
          </DialogContent>
        )}
        <DialogActions>
          <Button
            onClick={() => this.setState({ open: false })}
            color="primary"
          >
            Cancel
          </Button>
          <Button
            disabled={!this.props.stripe}
            color="primary"
            variant="contained"
            type="submit"
          >
            Pay
          </Button>
        </DialogActions>
      </form>
    );
  };

  renderSuccess = () => {
    return (
      <>
        <DialogTitle id="max-width-dialog-title">Pay success</DialogTitle>
        <DialogContent>
          <DialogContentText>You have add $5 to your account</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button color="primary" href="/dashboard">
            Close
          </Button>
        </DialogActions>
      </>
    );
  };

  render() {
    return (
      <>
        <Button
          variant="outlined"
          color="primary"
          onClick={() => this.setState({ open: true })}
        >
          Add Credit
        </Button>

        <Dialog
          fullWidth={true}
          maxWidth="md"
          open={this.state.open}
          onClose={() => this.setState({ open: false })}
          aria-labelledby="max-width-dialog-title"
        >
          {this.state.hasPaid ? this.renderSuccess() : this.renderForm()}
        </Dialog>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return { user: state.auth };
};

export default connect(mapStateToProps, null)(CheckoutForm);
