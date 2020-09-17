import axios from "axios";

export const updateCart = async (cart) => {
  try {
    await axios.post(
      `${process.env.REACT_APP_API_BASE_URL}/cart?_method=PUT`,
      cart
    );
  } catch (error) {
    console.log(error);
  }
};
