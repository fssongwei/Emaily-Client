import React, { useState, useEffect } from "react";
import { fetchAuthStatus, fetchProduct, deleteProduct } from "../../actions";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import LinearProgress from "@material-ui/core/LinearProgress";
import Container from "@material-ui/core/Container";
import Carousel from "react-material-ui-carousel";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
const getPictures = (pics) => {
  return (
    // <div style={{ maxWidth: "600px", margin: "0 auto" }}>
    <Carousel indicators={false}>
      {pics.map((pic, i) => (
        <img
          key={i}
          src={pic}
          alt="pic"
          style={{ width: "100%", height: "300px", objectFit: "cover" }}
        />
      ))}
    </Carousel>
    // </div>
  );
};

const getButtons = (user, product, deleteProduct) => {
  const isLogin = user !== undefined && user !== null && user !== false;
  if (!isLogin || product.owner !== user._id) {
    if (product.quantity === 0) {
      return (
        <Button size="small" disabled>
          sold out
        </Button>
      );
    } else {
      return (
        <Button
          size="small"
          color="primary"
          startIcon={<AddShoppingCartIcon />}
        >
          Add to cart
        </Button>
      );
    }
  }
  return (
    <>
      <Button
        component={Link}
        to={`/products/edit/${product._id}`}
        variant="contained"
        color="primary"
      >
        Edit
      </Button>
      <Button
        variant="contained"
        color="secondary"
        onClick={() => deleteProduct(product._id)}
      >
        Delete
      </Button>
    </>
  );
};

const ProductDetail = (props) => {
  let productId = props.match.params.id;
  const [product, setProduct] = useState(null);

  useEffect(() => {
    fetchProduct(productId, setProduct);
    fetchAuthStatus();
  }, [productId]);

  if (product === null) return <LinearProgress />;
  return (
    <Container style={{ maxWidth: "600px", margin: "0 auto" }}>
      <Card style={{ marginTop: "2em" }}>
        <CardContent style={{ padding: 0 }}>
          {getPictures(product.pics)}
        </CardContent>
        <CardContent>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <Typography gutterBottom variant="h5" component="h2">
              {product.name}
            </Typography>
            <Typography gutterBottom variant="h5" component="h2">
              {`$${product.price}`}
            </Typography>
          </div>
          <Typography variant="body2" component="p">
            {product.intro}
          </Typography>
        </CardContent>
        <CardActions style={{ display: "flex", justifyContent: "flex-end" }}>
          {getButtons(props.user, product, props.deleteProduct)}
        </CardActions>
      </Card>
    </Container>
  );
};

const mapStateToProps = (state) => {
  return { user: state.auth };
};

export default connect(mapStateToProps, { fetchAuthStatus, deleteProduct })(
  ProductDetail
);
