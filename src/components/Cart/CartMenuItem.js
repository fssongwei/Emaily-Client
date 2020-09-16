import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { setCartItem } from "../../actions";

import DeleteIcon from "@material-ui/icons/Delete";
import IconButton from "@material-ui/core/IconButton";
import MenuItem from "@material-ui/core/MenuItem";
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";
import { Link } from "react-router-dom";

const CartMenuItem = ({ item }) => {
  const [amount, setAmount] = useState(item.amount);
  const addItem = () => setAmount(Number(amount) + 1);
  const reduceItem = () => {
    if (Number(amount) - 1 > 0) setAmount(Number(amount) - 1);
  };
  const removeItem = () => setAmount(0);

  const dispatch = useDispatch();
  useEffect(() => {
    const func = () => dispatch(setCartItem(item.product, amount));
    func();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [amount]);

  return (
    <MenuItem component={Link} to={`/products/${item.product._id}`}>
      <div
        style={{
          display: "flex",
          justifyContent: "flex-start",
          width: "250px",
        }}
      >
        <div className="img">
          <img
            src={item.product.pics[0]}
            alt="pic"
            width="60px"
            height="60px"
            style={{ objectFit: "cover" }}
          />
        </div>
        <div
          className="intro"
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            alignItems: "flex-end",
            flexGrow: 1,
          }}
        >
          <div className="label" style={{ textAlign: "right" }}>
            <strong>{item.product.name}</strong>
          </div>
          <div
            className="selector"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            <div style={{ marginLeft: "1em" }}>
              <IconButton aria-label="delete" size="small" onClick={removeItem}>
                <DeleteIcon fontSize="small" />
              </IconButton>
            </div>
            <div>
              <IconButton
                style={{ size: "1em", padding: "0" }}
                color="primary"
                onClick={addItem}
              >
                <AddIcon />
              </IconButton>
              <input
                type="number"
                value={amount}
                variant="outlined"
                style={{ width: "3em" }}
                onChange={(e) => {
                  if (Number(e.target.value) > 0)
                    setAmount(Number(e.target.value));
                }}
              />
              <IconButton
                style={{ size: "1em", padding: "0" }}
                color="primary"
                onClick={reduceItem}
              >
                <RemoveIcon />
              </IconButton>
            </div>
          </div>
        </div>
      </div>
    </MenuItem>
  );
};

export default CartMenuItem;
