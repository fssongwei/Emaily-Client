import React from "react";
import { connect } from "react-redux";
import Snackbar from "@material-ui/core/Snackbar";
import Alert from "@material-ui/lab/Alert";

const Message = ({ message }) => {
  React.useEffect(() => {
    setOpen(message !== null);
  }, [message]);

  const [open, setOpen] = React.useState(message !== null);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  if (message === null) return null;
  return (
    <Snackbar open={open} autoHideDuration={5000} onClose={handleClose}>
      <Alert severity={message.status} onClose={handleClose}>
        {message.text}
      </Alert>
    </Snackbar>
  );
};

const mapStateToProps = (state) => {
  return { message: state.message };
};

export default connect(mapStateToProps, null)(Message);
