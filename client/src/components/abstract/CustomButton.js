import React from "react";

function CustomButton({ name, onClick, type, testId, disabled }) {
  return (
    <button
      data-testid={testId}
      type={type}
      onClick={onClick}
      disabled={disabled}>
      {name}
    </button>
  );
}

export default CustomButton;
