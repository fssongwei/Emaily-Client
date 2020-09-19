import React from "react";
import { reduxForm, Field } from "redux-form";

import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { comfirmShipment } from "./hooks";

const renderInput = ({ input, label }) => {
  return (
    <TextField {...input} label={label} margin="dense" required fullWidth />
  );
};

const renderHidden = ({ input }) => {
  return <input type="hidden" {...input} />;
};

const ComfirmShipment = ({ handleSubmit }) => {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button variant="contained" color="primary" onClick={handleClickOpen}>
        Have shipped? Click here!
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <form onSubmit={handleSubmit}>
          <DialogTitle id="form-dialog-title">Comfirm Shipment</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Please enter the shippment detail <br />
              (leave blank if not applicable)
            </DialogContentText>
            <Field
              name="trackCode"
              component={renderInput}
              label="Tracking Code"
            />
            <Field
              name="shipmentProvider"
              component={renderInput}
              label="Shipment Provider"
            />

            <Field name="orderId" component={renderHidden} />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Cancel
            </Button>
            <Button type="submit" color="primary">
              Confirm
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
};

const onFormSubmit = async (values) => {
  comfirmShipment(values);
};

export default reduxForm({
  form: "ComfirmShipment",
  onSubmit: onFormSubmit,
  enableReinitialize: true,
})(ComfirmShipment);
