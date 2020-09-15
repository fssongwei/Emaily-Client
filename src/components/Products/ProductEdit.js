import React from "react";
import { connect } from "react-redux";
import { popMessage } from "../../actions";
import { useOwnedProduct, onProductUpdate } from "./ProductHooks";

import LinearProgress from "@material-ui/core/LinearProgress";
import CreateProductForm from "./ProductForm";

const ProductEdit = ({ loadUser, match, popMessage }) => {
  let productId = match.params.id;
  const [loading, product] = useOwnedProduct(productId, loadUser, popMessage);
  if (loading) return <LinearProgress />;

  return (
    <CreateProductForm
      onSubmit={onProductUpdate(productId, popMessage)}
      title="Edit Products"
      initialValues={product}
    />
  );
};

const mapStateToProps = (state) => {
  return { loadUser: state.user };
};

export default connect(mapStateToProps, { popMessage })(ProductEdit);
