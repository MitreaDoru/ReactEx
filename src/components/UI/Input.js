import styled from "./Input.module.css";
import React from "react";
const Input = React.forwardRef((props, ref) => {
  return (
    <div className={styled.input}>
      <label htmlFor={props.input.id}>Amount</label>
      <input ref={ref} {...props.input} />
    </div>
  );
});

export default Input;
