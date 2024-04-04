import { useState } from "react";
import FormCard from "../components/FormCard";
import FormInput from "../components/FormInput";
import server from "../api/server";

export default function Login() {
  const [formInput, setFormInput] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    const name = e.target.name;

    setFormInput((prevValues) => ({
      ...prevValues,
      [name]: e.target.value,
    }));
  };

  const handleSubmit = async () => {
    try {
      const { data } = await server.post("/auth/login", formInput);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="vh-100 d-flex justify-content-center align-items-center">
      <FormCard submit={handleSubmit}>
        <FormInput
          type="email"
          name="email"
          value={formInput.email}
          onChange={handleChange}
          placeholder="Email"
        />
        <FormInput
          type="password"
          name="password"
          value={formInput.password}
          onChange={handleChange}
          placeholder="Password"
        />
      </FormCard>
    </div>
  );
}
