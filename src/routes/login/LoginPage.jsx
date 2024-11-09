import "./login.scss";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { apiClient } from "../../lib/api-client";
import { LOGIN_ROUTE } from "../../utils/constants";
import { useAppStore } from "../../store";

const LoginPage = () => {
  const { setUserInfo } = useAppStore();
  const navigateTo = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = await apiClient.post(LOGIN_ROUTE, formData, {
        withCredentials: true,
      });
      if (data) {
        setUserInfo(data.data.user);
        navigateTo("/");
      }
    } catch (err) {
      console.log(err);
    }

    console.log(formData);
  };

  return (
    <div className="main-login-container">
      <div className="container">
        <h2 className="title">Login</h2>
        <form onSubmit={handleSubmit} className="form">
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

          <button type="submit" className="button">
            Login
          </button>
        </form>
        <p className="loginText">
          Dont have an Account?{" "}
          <Link to="/signup" className="loginLink">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
