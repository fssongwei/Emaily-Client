import React, { Fragment } from "react";
import useProducts from "../../hooks/useProducts";

import CircularProgress from "@material-ui/core/CircularProgress";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import { Link } from "react-router-dom";

const ProductList = ({ query }) => {
  const [loading, products] = useProducts(query);

  if (loading) {
    return <CircularProgress style={{ margin: "3em auto" }} />;
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
              <CardContent>
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <Typography gutterBottom variant="h5" component="h2">
                    {product.name}
                  </Typography>

                  <Typography gutterBottom variant="h5" component="h2">
                    {product.quantity === 0 ? "SOLD OUT" : `$${product.price}`}
                  </Typography>
                </div>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>
      </Fragment>
    );
  });
};

export default ProductList;
