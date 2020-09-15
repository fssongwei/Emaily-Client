import React from "react";
import { connect } from "react-redux";
import { popMessage } from "../../actions";
import { onProductCreate } from "./ProductHooks";

import LinearProgress from "@material-ui/core/LinearProgress";
import history from "../../history";
import CreateProductForm from "./ProductForm";

const CreateProduct = ({ loadUser, popMessage }) => {
  const [loading, user] = loadUser;

  if (loading) return <LinearProgress />;
  if (!user) history.push("/");

  return (
    <CreateProductForm
      onSubmit={onProductCreate(popMessage)}
      title="Create a Product"
    />
  );
};

const mapStateToProps = (state) => {
  return { loadUser: state.user };
};

export default connect(mapStateToProps, { popMessage })(CreateProduct);
