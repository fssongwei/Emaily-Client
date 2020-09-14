import React from "react";
import { connect } from "react-redux";
import { popMessage } from "../../actions";
import useUser from "../../hooks/useUser";
import { onProductCreate } from "./ProductHooks";

import LinearProgress from "@material-ui/core/LinearProgress";
import history from "../../history";
import CreateProductForm from "./ProductForm";

const CreateProduct = ({ popMessage }) => {
  const [loading, user] = useUser();

  if (loading) return <LinearProgress />;
  if (!user) history.push("/");

  return (
    <CreateProductForm
      onSubmit={onProductCreate(popMessage)}
      title="Create a Product"
    />
  );
};

export default connect(null, { popMessage })(CreateProduct);
