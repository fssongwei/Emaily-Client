import React, { useEffect, useState, Fragment } from "react";
import { connect } from "react-redux";
import { fetchProducts } from "../actions";
import LinearProgress from "@material-ui/core/LinearProgress";

import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import FilterListIcon from "@material-ui/icons/FilterList";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";

import categories from "./assests/categories";
import { Link } from "react-router-dom";

const Landing = ({ fetchProducts, products, popMessage }) => {
  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const [currentCategory, setCurrentCategory] = useState("all");
  const newCategories = ["all", ...categories];

  if (products === null) return <LinearProgress />;

  const filter = (
    <div style={{ margin: "2em 0", display: "flex", alignItems: "center" }}>
      <FilterListIcon />
      Filter &nbsp;
      <ButtonGroup>
        {newCategories.map((category) => {
          return (
            <Button
              key={category}
              size="small"
              onClick={() => {
                setCurrentCategory(category);
                fetchProducts(category);
              }}
              variant={currentCategory === category ? "contained" : ""}
              color={currentCategory === category ? "primary" : ""}
            >
              {category}
            </Button>
          );
        })}
      </ButtonGroup>
    </div>
  );

  const productsList = products.map((product) => {
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

  return (
    <Container>
      {filter}
      <Grid container spacing={3}>
        {productsList}
      </Grid>
    </Container>
  );
};

const mapStateToProps = (state) => {
  return { products: state.products };
};

export default connect(mapStateToProps, { fetchProducts })(Landing);
