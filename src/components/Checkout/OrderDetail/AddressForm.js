import React from "react";
import { Field, reduxForm } from "redux-form";

import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";

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

const AddressForm = () => {
  return (
    <React.Fragment>
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
    </React.Fragment>
  );
};

const warppedForm = reduxForm({
  form: "address",
})(AddressForm);

export default warppedForm;
