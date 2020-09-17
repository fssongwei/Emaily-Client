import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { setCartItem } from "../../actions";

import DeleteIcon from "@material-ui/icons/Delete";
import IconButton from "@material-ui/core/IconButton";
import MenuItem from "@material-ui/core/MenuItem";
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";
import { Link } from "react-router-dom";
import Typography from "@material-ui/core/Typography";

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
          alignItems: "center",
          width: "100%",
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
          <div className="label">
            <strong>{item.product.name}</strong>
          </div>
          <div
            className="selector"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              width: "100%",
              minWidth: "250px",
            }}
          >
            <div>
              <h4 style={{ margin: "0.5em" }}>${item.product.price}</h4>
            </div>
            <div>
              <IconButton
                aria-label="delete"
                size="small"
                onClick={(e) => {
                  e.preventDefault();
                  removeItem();
                }}
                style={{ marginRight: "1em" }}
              >
                <DeleteIcon fontSize="small" />
              </IconButton>
              <IconButton
                style={{ size: "1em", padding: "0" }}
                color="primary"
                onClick={(e) => {
                  e.preventDefault();
                  addItem();
                }}
              >
                <AddIcon />
              </IconButton>
              <input
                type="number"
                value={item.amount}
                variant="outlined"
                style={{
                  width: "3em",
                  color: item.amount > item.product.quantity ? "red" : "black",
                }}
                onChange={(e) => {
                  if (Number(e.target.value) > 0)
                    setAmount(Number(e.target.value));
                }}
                onClick={(e) => e.preventDefault()}
              />
              <IconButton
                style={{ size: "1em", padding: "0" }}
                color="primary"
                onClick={(e) => {
                  e.preventDefault();
                  reduceItem();
                }}
              >
                <RemoveIcon />
              </IconButton>
            </div>
          </div>
          <div className="label">
            <Typography
              variant="caption"
              display="block"
              gutterBottom
              color={
                item.amount > item.product.quantity ? "secondary" : "inherit"
              }
            >
              remain {item.product.quantity}
            </Typography>
            {/* <label>remain {item.product.quantity}</label> */}
          </div>
        </div>
      </div>
    </MenuItem>
  );
};

export default CartMenuItem;
