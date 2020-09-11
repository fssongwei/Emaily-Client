import React from "react";
import Container from "@material-ui/core/Container";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

import { reduxForm, Field, FieldArray } from "redux-form";
import IconButton from "@material-ui/core/IconButton";
import ClearIcon from "@material-ui/icons/Clear";
import AddIcon from "@material-ui/icons/Add";

import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";

import categories from "../assests/categories";

const renderInput = ({ input, label, meta, rows }) => {
  return (
    <TextField
      label={label}
      variant="outlined"
      error={meta.error && meta.touched}
      {...input}
      multiline={rows > 0}
      rows={rows}
      helperText={meta.touched && meta.error}
      margin="normal"
      required
      fullWidth
    />
  );
};

const renderSelector = ({ input, label, meta, items }) => {
  const hasError = meta.touched && meta.error;
  return (
    <FormControl variant="outlined" fullWidth margin="normal">
      <InputLabel id="demo-simple-select-outlined-label">{label}</InputLabel>
      <Select {...input} label={label}>
        {items.map((item, i) => {
          return (
            <MenuItem value={item} key={i}>
              {item}
            </MenuItem>
          );
        })}
      </Select>
      <FormHelperText>{hasError && meta.error}</FormHelperText>
    </FormControl>
  );
};

const renderPicsUpdate = ({ fields, meta }) => {
  if (fields.length === 0) fields.push();

  return (
    <>
      {fields.length < 9 && (
        <IconButton
          onClick={() => fields.push()}
          style={{ position: "absolute", top: "-10px", right: 0 }}
        >
          <AddIcon fontSize="large" />
        </IconButton>
      )}

      {fields.map((pic, index) => (
        <div key={index} style={{ display: "flex" }}>
          <Field
            name={pic}
            component={renderInput}
            label={`Pic #${index + 1}`}
          />
          {fields.length > 1 && (
            <IconButton
              onClick={() => fields.remove(index)}
              style={{ alignSelf: "center" }}
            >
              <ClearIcon fontSize="large" />
            </IconButton>
          )}
        </div>
      ))}
    </>
  );
};

const CreateProductForm = ({ handleSubmit, title, product }) => {
  return (
    <Container>
      <form onSubmit={handleSubmit}>
        <div style={{ maxWidth: "600px", margin: "0 auto" }}>
          <h1>{title}</h1>
          <hr />
          <h2>1. Product Info</h2>
          <Field
            name="name"
            component={renderInput}
            label="Product Name"
            // data={product ? product.name : ""}
          />
          <Field
            name="intro"
            component={renderInput}
            label="Introduction"
            rows="4"
            // data={product ? product.intro : ""}
          />
          <Field
            name="price"
            component={renderInput}
            label="Price"
            // data={product ? product.price : ""}
          />
          <Field
            name="quantity"
            component={renderInput}
            label="Quantity"
            // data={product ? product.quantity : ""}
          />
          <Field
            name="category"
            component={renderSelector}
            label="Category"
            items={categories}
            // data={product ? product.category : ""}
          />

          <div style={{ position: "relative", margin: "3em 0" }}>
            <h2>2. Product Photos</h2>
            <FieldArray
              name="pics"
              component={renderPicsUpdate}
              // data={product ? product.pics : []}
            />
          </div>

          <div style={{ margin: "3em 0" }}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              size="large"
            >
              Submit
            </Button>
          </div>
        </div>
      </form>
    </Container>
  );
};

// const validate = (values) => {
//   const errors = {};
//   if (!values.name) errors.name = "Required";
//   if (!values.intro) errors.intro = "Required";
//   if (!values.price) errors.price = "Required";
//   if (!values.quantity) errors.quantity = "Required";
//   return errors;
// };

const CreateProductFormWrapped = reduxForm({
  form: "CreateProduct",
  enableReinitialize: true,
})(CreateProductForm);

export default CreateProductFormWrapped;
