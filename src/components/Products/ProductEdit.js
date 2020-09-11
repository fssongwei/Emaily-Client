import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { fetchAuthStatus, fetchProduct, popMessage } from "../../actions";

import LinearProgress from "@material-ui/core/LinearProgress";
import history from "../../history";
import CreateProductForm from "../SellDashboard/CreateProductForm";

import axios from "axios";

const ProductEdit = (props) => {
  let productId = props.match.params.id;
  const [product, setProduct] = useState(null);

  useEffect(() => {
    props.fetchAuthStatus();
    fetchProduct(productId, setProduct);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (props.user === null || product === null) return <LinearProgress />;
  if (!props.user || props.user._id !== product.owner) history.push("/");

  const onFormSubmit = async (values) => {
    try {
      await axios.post(
        `${process.env.REACT_APP_API_BASE_URL}/products/${productId}?_method=PUT`,
        values
      );
      props.popMessage({ status: "success", text: "Update successfully!" });
      history.push(`/products/${productId}`);
    } catch (error) {
      props.popMessage({ status: "error", text: "Unknown error!" });
      history.push("/");
      console.log(error);
    }
  };

  return (
    <>
      <CreateProductForm
        onSubmit={onFormSubmit}
        title="Edit Products"
        initialValues={product}
      />
    </>
  );
};

const mapStateToProps = (state) => {
  return { user: state.auth, product: state.product };
};

export default connect(mapStateToProps, { fetchAuthStatus, popMessage })(
  ProductEdit
);
