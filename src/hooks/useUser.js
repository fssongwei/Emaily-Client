import { useEffect, useState } from "react";
import axios from "axios";

const useUser = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_BASE_URL}/auth/user`
        );
        setUser(response.data);
      } catch (error) {
        setUser(false);
      }
      setLoading(false);
    };
    fetchUser();
  }, []);
  return [loading, user];
};

export default useUser;
