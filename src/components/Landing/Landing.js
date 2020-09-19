import React, { useState } from "react";

import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import ProductList from "../Products/ProductList";
import TabFilter from "./Filter";
import Searchbar from "./Searchbar";

const Landing = () => {
  const [query, setQuery] = useState({});

  return (
    <>
      <TabFilter setQuery={setQuery} />
      <Container style={{ marginTop: "2em" }}>
        <Searchbar setQuery={setQuery} />
        <Grid container spacing={3} style={{ marginTop: "2em" }}>
          <ProductList query={query} />
        </Grid>
      </Container>
    </>
  );
};
export default Landing;
