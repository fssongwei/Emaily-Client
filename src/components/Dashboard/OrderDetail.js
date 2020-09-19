import React from "react";
import { comfirmReceived } from "./hooks";

import Container from "@material-ui/core/Container";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import ComfirmShipment from "./ComfirmShipment";

const renderButton = (order) => {
  if (order.buyOrSell === "buy") {
    if (order.status === "shipped") {
      return (
        <Button
          color="primary"
          variant="contained"
          onClick={() => comfirmReceived(order._id)}
        >
          Received? Click here!
        </Button>
      );
    }
  } else if (order.buyOrSell === "sell") {
    if (order.status === "paid") {
      return <ComfirmShipment initialValues={{ orderId: order._id }} />;
    }
  }
  return null;
};

const OrderDetail = ({ location }) => {
  const order = location.state;
  if (!order) return null;
  return (
    <Container style={{ maxWidth: "600px", margin: "3em auto" }}>
      <Card style={{ marginTop: "2em" }}>
        <CardContent style={{ padding: 0 }}>
          <img
            src={order.product.pic}
            alt="pic"
            style={{ width: "100%", height: "300px", objectFit: "cover" }}
          />
        </CardContent>
        <CardContent>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <Typography gutterBottom variant="h5" component="h2">
              {order.product.name}
            </Typography>
            <Typography gutterBottom variant="h5" component="h2">
              ${order.product.price} * {order.amount}
            </Typography>
          </div>
          <hr />
          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <Typography gutterBottom variant="h5" component="h2">
              Total: ${order.product.price * order.amount}
            </Typography>
          </div>
          <Typography gutterBottom variant="h5" component="h2">
            Shipping Address
          </Typography>
          <Typography variant="body1" gutterBottom>
            {order.address.firstName} {order.address.lastName}
            <br />
            {order.address.address1} <br />
            {order.address.address2} <br />
            {order.address.city}, {order.address.state}, {order.address.zip}
            <br />
            {order.address.country}
          </Typography>

          {(order.trackCode || order.shipmentProvider) && (
            <div style={{ marginTop: "2em" }}>
              <Typography gutterBottom variant="h5" component="h2">
                Tracking
              </Typography>
              <Typography variant="body1" gutterBottom>
                <strong>Tracking Code</strong>:{" "}
                {order.trackCode || "unavaliable"} <br />{" "}
                <strong>Shipment Provider</strong>:{" "}
                {order.shipmentProvider || "unavaliable"}{" "}
              </Typography>
            </div>
          )}
        </CardContent>
        <CardActions
          style={{
            display: "flex",
            justifyContent: "flex-end",
            marginBottom: "2em",
          }}
        >
          {renderButton(order)}
        </CardActions>
      </Card>
    </Container>
  );
};

export default OrderDetail;
