import "./Login.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    phone: ""
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const emailRegex =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const phoneRegex =
      /^[0-9]{10}$/;

    if (!emailRegex.test(form.email)) {
      setError("Please enter a valid email.");
      return;
    }

    if (!phoneRegex.test(form.phone)) {
      setError("Phone number must have 10 digits.");
      return;
    }

    setError("");
    navigate("/home");
  };

  return (
    <div className="loginPage">
      <div className="loginCard">

        <h1>LOGIN</h1>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="username"
            placeholder="Username"
            onChange={handleChange}
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            onChange={handleChange}
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
          />

          <input
            type="text"
            name="phone"
            placeholder="Phone Number"
            onChange={handleChange}
          />

          <button>
            Continue
          </button>

          <p className="error">
            {error}
          </p>

        </form>
      </div>
    </div>
  );
}

export default Login;