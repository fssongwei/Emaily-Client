import React from "react";
import { connect } from "react-redux";
import { popMessage, setCartItem } from "../../actions";
import useProduct from "../../hooks/useProduct";
import { deleteProduct } from "./ProductHooks";
import history from "../../history";

import LinearProgress from "@material-ui/core/LinearProgress";
import Container from "@material-ui/core/Container";
import Carousel from "react-material-ui-carousel";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { Link } from "react-router-dom";

const ProductDetailPics = ({ pics }) => {
  return (
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
  );
};

const ProductDetailOps = ({ user, product, popMessage, setCartItem }) => {
  if (!user || product.owner !== user._id) {
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
          onClick={() => {
            if (!user) {
              history.push("/login");
              popMessage({ status: "warning", text: "Please login first" });
            } else setCartItem(product, 1);
          }}
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
        onClick={() => deleteProduct(product._id, popMessage)}
      >
        Delete
      </Button>
    </>
  );
};

const ProductDetail = ({ loadUser, match, popMessage, setCartItem }) => {
  const productId = match.params.id;
  const [loadingProduct, product] = useProduct(productId);
  const [loadingUser, user] = loadUser;

  if (loadingProduct || loadingUser) return <LinearProgress />;
  if (!product) {
    history.push("/");
    popMessage({ status: "warning", text: "Product doesn't exists!" });
    return null;
  }
  return (
    <Container style={{ maxWidth: "600px", margin: "0 auto" }}>
      <Card style={{ marginTop: "2em" }}>
        <CardContent style={{ padding: 0 }}>
          <ProductDetailPics pics={product.pics} />
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
          <ProductDetailOps
            user={user}
            product={product}
            popMessage={popMessage}
            setCartItem={setCartItem}
          />
        </CardActions>
      </Card>
    </Container>
  );
};

const mapStateToProps = (state) => {
  return { loadUser: state.user };
};

export default connect(mapStateToProps, { popMessage, setCartItem })(
  ProductDetail
);
