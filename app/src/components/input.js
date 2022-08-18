import React from "react";

export const Input = ({
  handleChange,
  handleBlur,
  label,
  touched,
  value,
  error,
  ...otherProps
}) => {
  return (
    <div className="">
      <input
        {...otherProps}
        className={`inpt ${otherProps.disabled && "disabled"}`}
        type={otherProps.type || "text"}
        name={otherProps.name}
        maxLength={otherProps.maxLength}
        placeholder={otherProps.placeholder}
        required={otherProps.required}
        value={otherProps.value}
        autoComplete="new-password"
        disabled={otherProps.disabled}
      />
      {touched && error && <div className="error-message">{error}</div>}
    </div>
  );
};
