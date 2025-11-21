// src/components/Login.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import * as bootstrap from "bootstrap";
import Navbar from "./Navbar";
import Footer from "./Footer";

export default function Login() {
  const navigate = useNavigate();

  // State for form fields
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  // State for errors
  const [errors, setErrors] = useState({});
  const [loginError, setLoginError] = useState("");

  // Loading state
  const [loading, setLoading] = useState(false);

  // If already logged in, redirect
  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      navigate("/");
    }
  }, [navigate]);

  // Handle form input change
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

    // Reset error for the field
    setErrors({
      ...errors,
      [e.target.name]: "",
    });
  };

  // Validate form
  const validate = () => {
    let newErrors = {};
    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.email)
    ) {
      newErrors.email = "Invalid email address";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 4) {
      newErrors.password = "Password must be at least 4 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoginError("");

    if (!validate()) return;

    try {
      setLoading(true);

      // Fetch users from db.json
      const res = await axios.get("http://localhost:3000/users");
      const users = res.data;

      const matchedUser = users.find(
        (u) => u.email === formData.email && u.password === formData.password
      );

      if (matchedUser) {
        // Save user in localStorage
        localStorage.setItem("user", JSON.stringify(matchedUser));

        // Bootstrap success toast
        const toastEl = document.getElementById("loginSuccessToast");
        const toast = new bootstrap.Toast(toastEl);
        toast.show();

        // Redirect to homepage
        setTimeout(() => {
          navigate("/");
        }, 1500);
      } else {
        setLoginError("Invalid email or password.");
      }
    } catch (err) {
      console.error("Login error:", err);
      setLoginError("Something went wrong. Try again later.");
    } finally {
      setLoading(false);
    }
  };

  return ( 
    <>
    <Navbar/>
    <div className="container mt-5" style={{ maxWidth: "500px" }}>
      <h2 className="text-center mb-4">Login</h2>

      {loginError && (
        <div className="alert alert-danger text-center">{loginError}</div>
      )}

      <form onSubmit={handleSubmit} noValidate>
        {/* Email Field */}
        <div className="mb-3">
          <label className="form-label">Email Address</label>
          <input
            type="email"
            name="email"
            className={`form-control ${errors.email ? "is-invalid" : ""}`}
            value={formData.email}
            onChange={handleChange}
          />
          {errors.email && (
            <div className="invalid-feedback">{errors.email}</div>
          )}
        </div>

        {/* Password Field */}
        <div className="mb-3">
          <label className="form-label">Password</label>
          <input
            type="password"
            name="password"
            className={`form-control ${errors.password ? "is-invalid" : ""}`}
            value={formData.password}
            onChange={handleChange}
          />
          {errors.password && (
            <div className="invalid-feedback">{errors.password}</div>
          )}
        </div>

        {/* Submit */}
        <div className="d-grid">
          <button
            type="submit"
            className="btn btn-primary"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </div>
      </form>

      {/* Success Toast */}
      <div
        className="toast align-items-center text-bg-success border-0 position-fixed bottom-0 end-0 m-3"
        id="loginSuccessToast"
        role="alert"
        aria-live="assertive"
        aria-atomic="true"
      >
        <div className="d-flex">
          <div className="toast-body">Login Successful 🎉</div>
          <button
            type="button"
            className="btn-close btn-close-white me-2 m-auto"
            data-bs-dismiss="toast"
            aria-label="Close"
          ></button>
        </div>
      </div>
    </div>
    <Footer/>
    </>
  );
}
