// Checkout.js
import React, { useState } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";

export default function Checkout() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    address: "",
    city: "",
    postalCode: "",
    country: "",
    cardNumber: "",
    expiry: "",
    cvv: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Order Placed Successfully!");
  };

  // Inline styles
  const styles = {
    section: {
      backgroundColor: "#f9f9f9",
      padding: "50px 0",
    },
    container: {
      maxWidth: "600px",
      margin: "auto",
      backgroundColor: "#fff",
      padding: "40px",
      borderRadius: "12px",
      boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)",
    },
    heading: {
      color: "#1c2b4a",
      marginBottom: "20px",
      textTransform: "uppercase",
    },
    input: {
      width: "100%",
      padding: "12px 15px",
      marginBottom: "15px",
      borderRadius: "8px",
      border: "1px solid #ccc",
      fontSize: "14px",
      boxSizing: "border-box",
    },
    button: {
      width: "100%",
      padding: "15px",
      backgroundColor: "#ff6f61",
      color: "#fff",
      border: "none",
      borderRadius: "8px",
      textTransform: "uppercase",
      fontWeight: "bold",
      cursor: "pointer",
      transition: "0.3s",
    },
  };

  return (
    <div>
      <Navbar />
      <section style={styles.section}>
        <div style={styles.container}>
          <h2 style={styles.heading}>Checkout</h2>
          <form onSubmit={handleSubmit}>
            <h4 style={styles.heading}>Billing Details</h4>
            <input
              style={styles.input}
              type="text"
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleChange}
              required
            />
            <input
              style={styles.input}
              type="email"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <input
              style={styles.input}
              type="text"
              name="address"
              placeholder="Address"
              value={formData.address}
              onChange={handleChange}
              required
            />
            <input
              style={styles.input}
              type="text"
              name="city"
              placeholder="City"
              value={formData.city}
              onChange={handleChange}
              required
            />
            <input
              style={styles.input}
              type="text"
              name="postalCode"
              placeholder="Postal Code"
              value={formData.postalCode}
              onChange={handleChange}
              required
            />
            <input
              style={styles.input}
              type="text"
              name="country"
              placeholder="Country"
              value={formData.country}
              onChange={handleChange}
              required
            />

            <h4 style={{ ...styles.heading, marginTop: "30px" }}>
              Payment Details
            </h4>
            <input
              style={styles.input}
              type="text"
              name="cardNumber"
              placeholder="Card Number"
              value={formData.cardNumber}
              onChange={handleChange}
              required
            />
            <input
              style={styles.input}
              type="text"
              name="expiry"
              placeholder="MM/YY"
              value={formData.expiry}
              onChange={handleChange}
              required
            />
            <input
              style={styles.input}
              type="text"
              name="cvv"
              placeholder="CVV"
              value={formData.cvv}
              onChange={handleChange}
              required
            />

            <button type="submit" style={styles.button} className="mt-3">
              Place Order
            </button>
          </form>
        </div>
      </section>
      <Footer />
    </div>
  );
}
