import { useEffect, useState } from "react";
import axios from "axios";

const useProduct = (productId) => {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_BASE_URL}/products/${productId}`
        );
        setProduct(response.data);
        setLoading(false);
      } catch (error) {
        throw error;
      }
    };
    fetchProduct();
  }, [productId]);
  return [loading, product];
};

export default useProduct;
