import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import SearchIcon from "@material-ui/icons/Search";

const handleSearch = (e, value, setQuery) => {
  e.preventDefault();
  setQuery({ term: value });
  console.log(value);
};

const Searchbar = ({ setQuery }) => {
  const [value, setValue] = useState("");

  return (
    <form onSubmit={(e) => handleSearch(e, value, setQuery)}>
      <TextField
        variant="outlined"
        fullWidth
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    </form>
  );
};

export default Searchbar;
