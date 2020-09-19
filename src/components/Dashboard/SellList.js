import React from "react";
import { Link } from "react-router-dom";

import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import { useOrders } from "./hooks";

const SellList = () => {
  const [loading, orders] = useOrders("sell");
  if (loading || !orders) return <p>loading ...</p>;
  if (orders.length === 0) return <p>Your have not sell anything yet.</p>;
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Product Name</TableCell>
            <TableCell>Price</TableCell>
            <TableCell>Quantity</TableCell>
            <TableCell>Total Price</TableCell>
            <TableCell>Purchase Date</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Operation</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {orders.map((order, id) => {
            return (
              <TableRow key={id}>
                <TableCell>{order.product.name}</TableCell>
                <TableCell>{order.product.price}</TableCell>
                <TableCell>{order.amount}</TableCell>
                <TableCell>{order.amount * order.product.price}</TableCell>
                <TableCell>{order.date.substring(0, 10)}</TableCell>
                <TableCell>{order.status}</TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    color="primary"
                    size="small"
                    component={Link}
                    to={{
                      pathname: "/order",
                      state: { ...order, buyOrSell: "sell" },
                    }}
                  >
                    detail
                  </Button>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default SellList;
