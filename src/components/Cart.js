import React, { useEffect, useState } from "react";
import * as bootstrap from "bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Cart({ newItemAdded }) {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    fetchCart();
  }, [newItemAdded]); 

  const fetchCart = async () => {
    try {
      const res = await axios.get("http://localhost:3000/cart");
      const itemsWithQuantity = res.data.map((item) => ({
        ...item,
        quantity: item.quantity || 1,
      }));
      setCartItems(itemsWithQuantity);
    } catch (err) {
      console.error("Error fetching cart:", err);
    }
  };

  const updateQuantity = async (id, change) => {
    setCartItems((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          const newQty = Math.max(1, item.quantity + change);
          axios
            .patch(`http://localhost:3000/cart/${id}`, { quantity: newQty })
            .catch((err) => console.error("Error updating quantity:", err));
          return { ...item, quantity: newQty };
        }
        return item;
      })
    );
  };

  const handleRemove = async (id) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
    try {
      await axios.delete(`http://localhost:3000/cart/${id}`);
    } catch (err) {
      console.error("Error deleting item:", err);
    }
  };

  const total = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const handleCheckout = () => {
    const offcanvasEl = document.getElementById("offcanvasCart");
    const bsOffcanvas = bootstrap.Offcanvas.getInstance(offcanvasEl);
    if (bsOffcanvas) bsOffcanvas.hide();
    navigate("/checkout");
  };

  return (
    <div
      className="offcanvas offcanvas-end"
      data-bs-scroll="true"
      tabIndex="-1"
      id="offcanvasCart"
      aria-labelledby="My Cart"
    >
      <div className="offcanvas-header justify-content-center">
        <h5 className="offcanvas-title">Your Cart</h5>
        <button
          type="button"
          className="btn-close"
          data-bs-dismiss="offcanvas"
          aria-label="Close"
        ></button>
      </div>
      <div className="offcanvas-body">
        <div className="order-md-last">
          <h4 className="d-flex justify-content-between align-items-center mb-3">
            <span className="text-primary">Cart Items</span>
            <span className="badge bg-primary rounded-pill">
              {cartItems.length}
            </span>
          </h4>

          {cartItems.length === 0 ? (
            <p className="text-center text-muted">Your cart is empty.</p>
          ) : (
            <ul className="list-group mb-3">
              {cartItems.map((item) => (
                <li
                  key={item.id}
                  className="list-group-item d-flex justify-content-between align-items-center"
                >
                  <div>
                    <h6 className="my-0">{item.title}</h6>
                    <div className="d-flex align-items-center mt-2">
                      <button
                        className="btn btn-sm btn-outline-secondary me-2"
                        onClick={() => updateQuantity(item.id, -1)}
                      >
                        ➖
                      </button>
                      <span>{item.quantity}</span>
                      <button
                        className="btn btn-sm btn-outline-secondary ms-2"
                        onClick={() => updateQuantity(item.id, 1)}
                      >
                        ➕
                      </button>
                    </div>
                  </div>
                  <div className="d-flex align-items-center">
                    <span className="me-3">₹{item.price * item.quantity}</span>
                    <button
                      className="btn btn-sm btn-outline-danger"
                      onClick={() => handleRemove(item.id)}
                    >
                      ❌
                    </button>
                  </div>
                </li>
              ))}
              <li className="list-group-item d-flex justify-content-between">
                <span>Total</span>
                <strong>₹{total}</strong>
              </li>
            </ul>
          )}

          <button
            className="w-100 btn btn-primary btn-lg"
            type="button"
            onClick={handleCheckout}
            disabled={cartItems.length === 0}
          >
            Continue to Checkout
          </button>
        </div>
      </div>
    </div>
  );
}
