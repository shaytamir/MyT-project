import React from "react";

const Input = ({ name, label, error, ...rest }) => {
  return (
    <div className="">
      <label htmlFor={name}>{label}</label>
      <input {...rest} name={name} id={name} className="" />
      <p>{error && <span className="text-danger">{error}</span>}</p>
    </div>
  );
};

export default Input;
