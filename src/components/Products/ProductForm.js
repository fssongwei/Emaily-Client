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
import Typography from "@material-ui/core/Typography";

import categories from "../../resources/categories";

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
        <div style={{ maxWidth: "800px", margin: "0 auto" }}>
          <div style={{ margin: "2em 0" }}>
            <Typography variant="h4" gutterBottom>
              {title}
            </Typography>
            <hr />
          </div>
          <div style={{ margin: "2em 0" }}>
            <Typography variant="h5" gutterBottom>
              Product Info
            </Typography>
            <Field name="name" component={renderInput} label="Product Name" />
            <Field
              name="intro"
              component={renderInput}
              label="Introduction"
              rows="4"
            />
            <Field name="price" component={renderInput} label="Price" />
            <Field name="quantity" component={renderInput} label="Quantity" />
            <Field
              name="category"
              component={renderSelector}
              label="Category"
              items={categories}
            />
          </div>

          <div style={{ position: "relative", margin: "2em 0" }}>
            <Typography variant="h5" gutterBottom>
              Product Photos
            </Typography>
            <FieldArray name="pics" component={renderPicsUpdate} />
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

const validate = (values) => {
  const errors = {};
  if (!values.name) errors.name = "Required";
  if (!values.intro) errors.intro = "Required";
  if (!values.price) errors.price = "Required";
  if (!values.quantity) errors.quantity = "Required";
  return errors;
};

const CreateProductFormWrapped = reduxForm({
  form: "CreateProduct",
  enableReinitialize: true,
  validate,
})(CreateProductForm);

export default CreateProductFormWrapped;
