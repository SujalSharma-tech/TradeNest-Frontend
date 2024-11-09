import "./signuppage.scss";
import { useState } from "react";
import { Link } from "react-router-dom";

const SignupPage = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log(formData);
  };

  return (
    <div className="main-signup-container">
      <div className="container">
        <h2 className="title">SignUp</h2>
        <form onSubmit={handleSubmit} className="form">
          <input
            type="text"
            name="firstName"
            placeholder="First Name"
            value={formData.firstName}
            onChange={handleChange}
            className="input"
          />
          <input
            type="text"
            name="lastName"
            placeholder="Last Name"
            value={formData.lastName}
            onChange={handleChange}
            className="input"
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="input"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="input"
          />
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={formData.confirmPassword}
            onChange={handleChange}
            className="input"
          />
          <button type="submit" className="button">
            Register
          </button>
        </form>
        <p className="loginText">
          Already Have an Account?{" "}
          <Link to="/login" className="loginLink">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignupPage;
