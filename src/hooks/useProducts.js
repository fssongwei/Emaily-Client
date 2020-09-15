import { useEffect, useState } from "react";
import axios from "axios";

const useProducts = (query) => {
  const [products, setProducts] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_BASE_URL}/products`,
          {
            params: query,
          }
        );

        setProducts(response.data);
        setLoading(false);
      } catch (error) {
        throw error;
      }
    };
    fetchProducts();
  }, [query]);

  return [loading, products];
};

export default useProducts;
