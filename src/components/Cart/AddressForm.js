import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Field, reduxForm } from "redux-form";

import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";

const onFormSubmit = (cart) => (values) => {
  const transaction = {
    items: cart,
    address: values,
  };
  console.log(transaction);
};

const InputField = ({ input, label, autoComplete, required }) => {
  return (
    <TextField
      {...input}
      required={required}
      label={label}
      fullWidth
      autoComplete={autoComplete}
    />
  );
};

const AddressForm = ({ cart, handleSubmit }) => {
  const [canPay, setCanPay] = useState(true);

  useEffect(() => {
    if (cart === null) return;
    setCanPay(true);
    for (let item of cart) {
      if (item.amount > item.product.quantity) {
        setCanPay(false);
        break;
      }
    }
  }, [cart]);

  if (cart === null) return null;

  return (
    <React.Fragment>
      <form onSubmit={handleSubmit(onFormSubmit(cart))}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <Field
              component={InputField}
              name="firstName"
              label="First name"
              autoComplete="given-name"
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Field
              component={InputField}
              name="lastName"
              label="Last name"
              autoComplete="family-name"
              required
            />
          </Grid>
          <Grid item xs={12}>
            <Field
              component={InputField}
              name="address1"
              label="Address line 1"
              autoComplete="shipping address-line1"
              required
            />
          </Grid>
          <Grid item xs={12}>
            <Field
              component={InputField}
              name="address2"
              label="Address line 2"
              autoComplete="shipping address-line2"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Field
              component={InputField}
              name="city"
              label="City"
              autoComplete="shipping address-level2"
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Field
              component={InputField}
              name="state"
              label="State/Province/Region"
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Field
              component={InputField}
              name="zip"
              label="Zip / Postal code"
              autoComplete="shipping postal-code"
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Field
              component={InputField}
              name="country"
              label="Country"
              autoComplete="shipping country"
              required
            />
          </Grid>
        </Grid>
        <div style={{ textAlign: "right", marginTop: "2em" }}>
          <Button
            variant="contained"
            color="primary"
            disabled={!canPay}
            type="submit"
          >
            Card Payment
          </Button>
        </div>
      </form>
    </React.Fragment>
  );
};

const mapStateToProps = (state) => {
  return { cart: state.cart };
};

const connectedForm = connect(mapStateToProps, null)(AddressForm);

const warppedForm = reduxForm({
  form: "address",
})(connectedForm);

export default warppedForm;
