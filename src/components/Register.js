// src/components/Register.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";

export default function Register() {
  const [formData, setFormData] = useState({
    fullName: "",
    mobile: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");
  const navigate = useNavigate();

  // handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    try {
      const res = await fetch("http://localhost:3000/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.fullName,
          mobile: formData.mobile,
          email: formData.email,
          password: formData.password,
        }),
      });

      if (res.ok) {
        alert("Registration Successful! Please login.");
        navigate("/login");
      } else {
        setError("Registration failed. Try again.");
      }
    } catch (err) {
      console.error(err);
      setError("Error connecting to server.");
    }
  };

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#f8f9fa" }}>
      <Navbar />

      <div
        className="register-page d-flex align-items-center justify-content-center py-5"
        style={{ minHeight: "80vh" }}
      >
        <div className="register-container">
          <h2 className="register-title">Create Account</h2>

          {error && (
            <div
              style={{
                color: "red",
                textAlign: "center",
                marginBottom: "15px",
              }}
            >
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="fullName"
              placeholder="Full Name"
              className="form-control"
              value={formData.fullName}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="mobile"
              placeholder="Mobile Number"
              className="form-control"
              value={formData.mobile}
              onChange={handleChange}
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              className="form-control"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              className="form-control"
              value={formData.password}
              onChange={handleChange}
              required
            />
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              className="form-control"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
            <button type="submit" className="btn-register">
              Register
            </button>
          </form>

          <div className="login-text">
            Already have an account? <a href="/login">Sign In</a>
          </div>
        </div>
      </div>

      <Footer />

      <style>{`
        .register-container {
          background-color: #fff;
          padding: 40px 30px;
          border-radius: 12px;
          box-shadow: 0 8px 30px rgba(0,0,0,0.08);
          width: 100%;
          max-width: 450px;
        }
        .register-title {
          font-size: 1.8rem;
          font-weight: 700;
          text-align: center;
          color: #333;
          margin-bottom: 25px;
        }
        .form-control {
          border-radius: 8px;
          padding: 12px 15px;
          margin-bottom: 18px;
          border: 1px solid #ced4da;
          font-size: 0.95rem;
        }
        .form-control:focus {
          border-color: #999;
          box-shadow: 0 0 0 2px rgba(0,0,0,0.05);
        }
        .btn-register {
          width: 100%;
          padding: 12px;
          background-color: #333;
          color: #fff;
          border: none;
          border-radius: 8px;
          font-size: 1rem;
          font-weight: 600;
          transition: all 0.3s ease;
        }
        .btn-register:hover {
          background-color: #555;
        }
        .login-text {
          text-align: center;
          margin-top: 20px;
          font-size: 0.95rem;
        }
        .login-text a {
          color: #333;
          text-decoration: none;
          font-weight: 500;
        }
        .login-text a:hover {
          text-decoration: underline;
        }
      `}</style>
    </div>
  );
}
