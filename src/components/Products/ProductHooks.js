import useUser from "../../hooks/useUser";
import useProduct from "../../hooks/useProduct";
import history from "../../history";
import axios from "axios";

export const onProductUpdate = (productId, popMessage) => async (values) => {
  try {
    await axios.post(
      `${process.env.REACT_APP_API_BASE_URL}/products/${productId}?_method=PUT`,
      values
    );
    popMessage({ status: "success", text: "Update successfully!" });
    history.push(`/products/${productId}`);
  } catch (error) {
    popMessage({ status: "error", text: "Unknown error!" });
    history.push("/");
    console.log(error);
  }
};

export const useOwnedProduct = (productId, loadUser, popMessage) => {
  const [loadingProduct, product] = useProduct(productId);
  const [loadingUser, user] = useUser();
  const loading = loadingProduct || loadingUser;
  if (!loading && (!user || user._id !== product.owner)) {
    popMessage({ status: "error", text: "Unauthorize Access!" });
    history.push("/");
  }
  return [loading, product];
};

export const deleteProduct = async (productId, popMessage) => {
  try {
    await axios.post(
      `${process.env.REACT_APP_API_BASE_URL}/products/${productId}?_method=DELETE`
    );
    popMessage({ status: "success", text: "Product delete successfully!" });
    history.push("/");
  } catch (error) {
    popMessage({ status: "error", text: "Unknown error!" });
    console.log(error);
  }
};

export const onProductCreate = (popMessage) => async (values) => {
  console.log(values);
  try {
    let res = await axios.post(
      `${process.env.REACT_APP_API_BASE_URL}/products`,
      values
    );
    let productId = res.data.productId;
    popMessage({
      status: "success",
      text: "Item create successfully!",
    });
    history.push(`/products/${productId}`);
  } catch (error) {
    console.log(error);
  }
};
