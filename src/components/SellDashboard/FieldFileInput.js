import React from "react";

const FieldFileInput = ({ input }) => {
  const onFileChange = (e) => input.onChange(e.target.files[0]);
  return (
    <div>
      <div>
        <input type="file" accept=".jpg, .png, .jpeg" onChange={onFileChange} />
      </div>
    </div>
  );
};

export default FieldFileInput;
