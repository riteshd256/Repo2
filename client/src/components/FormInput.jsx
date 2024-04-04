/* eslint-disable react/prop-types */
import { Form } from "react-bootstrap";
import classes from "./FromInput.module.css";

export default function FormInput({
  type,
  name,
  value,
  onChange,
  placeholder,
}) {
  return (
    <Form.Group className="mb-3" controlId={`formBasic${name}`}>
      <Form.Control
        className={`${classes.input} bg-secondary border-0 text-light py-2`}
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
      />
    </Form.Group>
  );
}

FormInput.defaultProps = {
  type: "text",
};
