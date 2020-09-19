import React, { Fragment } from "react";
import useProducts from "../../hooks/useProducts";
import { connect } from "react-redux";
import { popMessage, setCartItem } from "../../actions";
import history from "../../history";

import CircularProgress from "@material-ui/core/CircularProgress";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";
import { Link } from "react-router-dom";

const renderButton = (loadUser, product, popMessage, setCartItem) => {
  const [loading, user] = loadUser;
  if (loading) return;
  if (product.quantity > 0 && (!user || product.owner !== user._id)) {
    return (
      <IconButton
        onClick={(e) => {
          e.preventDefault();
          if (!user) {
            history.push("/login");
            popMessage({ status: "warning", text: "Please login first" });
          } else setCartItem(product, 1);
        }}
      >
        <AddShoppingCartIcon color="primary" />
      </IconButton>
    );
  }
};

const ProductList = ({ query, loadUser, popMessage, setCartItem }) => {
  const [loading, products] = useProducts(query);

  if (loading) {
    return <CircularProgress style={{ margin: "3em auto" }} />;
  }

  if (products.length === 0) {
    return (
      <Typography variant="body1" gutterBottom align="center">
        Nothing found yet. Try to expore more products.
      </Typography>
    );
  }

  return products.map((product) => {
    return (
      <Fragment key={product._id}>
        <Grid item xs={6} sm={4} md={3}>
          <Card>
            <CardActionArea component={Link} to={`/products/${product._id}`}>
              <CardMedia
                component="img"
                alt="Contemplative Reptile"
                height="200"
                image={product.pics[0]}
                title="Contemplative Reptile"
              />
              <CardContent style={{ padding: "0.5em 0.6em" }}>
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <div className="productDetail">
                    <Typography
                      variant="subtitle1"
                      gutterBottom
                      style={{ lineHeight: "1.25" }}
                    >
                      {product.name}
                    </Typography>
                    <Typography
                      variant="subtitle1"
                      gutterBottom
                      color="primary"
                      style={{ lineHeight: "1.25" }}
                    >
                      {product.quantity === 0
                        ? "SOLD OUT"
                        : `$${product.price}`}
                    </Typography>
                  </div>
                  <div className="button">
                    {/* <IconButton>
                      <AddShoppingCartIcon color="primary" />
                    </IconButton> */}
                    {renderButton(loadUser, product, popMessage, setCartItem)}
                  </div>
                </div>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>
      </Fragment>
    );
  });
};

const mapStateToProps = (state) => {
  return { loadUser: state.user };
};

export default connect(mapStateToProps, { popMessage, setCartItem })(
  ProductList
);
