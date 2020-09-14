import React from "react";
import { connect } from "react-redux";
import { popMessage } from "../../actions";
import { useOwnedProduct, onProductUpdate } from "./ProductHooks";

import LinearProgress from "@material-ui/core/LinearProgress";
import CreateProductForm from "./ProductForm";

const ProductEdit = ({ match, popMessage }) => {
  let productId = match.params.id;
  const [loading, product] = useOwnedProduct(productId, popMessage);
  if (loading) return <LinearProgress />;

  return (
    <CreateProductForm
      onSubmit={onProductUpdate(productId, popMessage)}
      title="Edit Products"
      initialValues={product}
    />
  );
};

export default connect(null, { popMessage })(ProductEdit);
