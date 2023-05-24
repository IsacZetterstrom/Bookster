import React from "react";

function CustomButton({ name, onClick, type }) {
  return (
    <button type={type} onClick={onClick}>
      {name}
    </button>
  );
}

export default CustomButton;
