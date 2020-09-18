import { useEffect, useState } from "react";
import axios from "axios";
import history from "../../history";
import store from "../../store";
import { popMessage } from "../../actions";

export const useOrders = (buyOrSell) => {
  const [orders, setOrders] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_BASE_URL}/${buyOrSell}`
        );
        setOrders(response.data);
      } catch (error) {
        setOrders(false);
      }
      setLoading(false);
    };
    fetch();
  }, [buyOrSell]);
  return [loading, orders];
};

export const comfirmShipment = async (values) => {
  try {
    await axios.post(
      `${process.env.REACT_APP_API_BASE_URL}/comfirmShipment`,
      values
    );
    history.push("/iSell");
    store.dispatch(
      popMessage({ status: "success", text: "Comfirm Shipment Success!" })
    );
  } catch (error) {
    history.push("/iSell");
    store.dispatch(popMessage({ status: "warning", text: error.toString() }));
  }
};

export const comfirmReceived = async (orderId) => {
  try {
    await axios.post(`${process.env.REACT_APP_API_BASE_URL}/comfirmReceived`, {
      orderId: orderId,
    });
    history.push("/iBuy");
    store.dispatch(
      popMessage({ status: "success", text: "Received Comfirm Success!" })
    );
  } catch (error) {
    history.push("/iBuy");
    store.dispatch(popMessage({ status: "warning", text: error.toString() }));
  }
};
