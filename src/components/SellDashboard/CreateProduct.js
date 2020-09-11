import React, { useEffect } from "react";
import { connect } from "react-redux";
import { fetchAuthStatus, popMessage } from "../../actions";

import LinearProgress from "@material-ui/core/LinearProgress";
import history from "../../history";
import CreateProductForm from "./CreateProductForm";

import axios from "axios";

const CreateProduct = (props) => {
  useEffect(() => {
    props.fetchAuthStatus();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (props.user === null) return <LinearProgress />;
  if (!props.user) history.push("/");

  const onFormSubmit = async (values) => {
    console.log(values);

    try {
      let res = await axios.post(
        `${process.env.REACT_APP_API_BASE_URL}/products`,
        values
      );
      let productId = res.data.productId;
      props.popMessage({
        status: "success",
        text: "Item create successfully!",
      });
      history.push(`/products/${productId}`);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <CreateProductForm onSubmit={onFormSubmit} title="Create a Product" />
    </>
  );
};

const mapStateToProps = (state) => {
  return { user: state.auth };
};

export default connect(mapStateToProps, { fetchAuthStatus, popMessage })(
  CreateProduct
);
