import React, { useState } from "react";

import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import FilterListIcon from "@material-ui/icons/FilterList";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import categories from "./assests/categories";
import ProductList from "./Products/ProductList";

const Filter = ({ setQuery }) => {
  const newCategories = ["all", ...categories];
  const [currentCategory, setCurrentCategory] = useState("all");

  return (
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
                if (category === "all") setQuery({});
                else setQuery({ category: category });
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
};

const Landing = () => {
  const [query, setQuery] = useState({});

  return (
    <Container>
      <Filter setQuery={setQuery} />
      <Grid container spacing={3}>
        <ProductList query={query} />
      </Grid>
    </Container>
  );
};
export default Landing;
