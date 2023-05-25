import React from "react";

function CustomButton({ name, onClick, type, testId }) {
  return (
    <button data-testid={testId} type={type} onClick={onClick}>
      {name}
    </button>
  );
}

export default CustomButton;
