// src/components/CartContext.js
import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  // Load cart items from db.json on mount
  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    try {
      const res = await axios.get("http://localhost:3000/cart");
      setCart(res.data);
    } catch (err) {
      console.error("Error fetching cart:", err);
    }
  };

  // ✅ Add to Cart
  const addToCart = async (product) => {
    try {
      // check if product already in cart
      const existingItem = cart.find((item) => item.id === product.id);

      if (existingItem) {
        // update quantity
        const updatedItem = { ...existingItem, quantity: existingItem.quantity + 1 };
        await axios.put(`http://localhost:3000/cart/${existingItem.id}`, updatedItem);

        setCart((prevCart) =>
          prevCart.map((item) =>
            item.id === existingItem.id ? updatedItem : item
          )
        );
      } else {
        // add new product with quantity = 1
        const newItem = { ...product, quantity: 1 };
        await axios.post("http://localhost:3000/cart", newItem);
        setCart((prevCart) => [...prevCart, newItem]);
      }
    } catch (err) {
      console.error("Error adding to cart:", err);
    }
  };

  // ✅ Increase Quantity
  const increaseQuantity = async (id) => {
    try {
      const item = cart.find((i) => i.id === id);
      if (!item) return;

      const updatedItem = { ...item, quantity: item.quantity + 1 };
      await axios.put(`http://localhost:3000/cart/${id}`, updatedItem);

      setCart((prevCart) =>
        prevCart.map((i) => (i.id === id ? updatedItem : i))
      );
    } catch (err) {
      console.error("Error increasing quantity:", err);
    }
  };

  // ✅ Decrease Quantity (minimum = 1)
  const decreaseQuantity = async (id) => {
    try {
      const item = cart.find((i) => i.id === id);
      if (!item || item.quantity <= 1) return;

      const updatedItem = { ...item, quantity: item.quantity - 1 };
      await axios.put(`http://localhost:3000/cart/${id}`, updatedItem);

      setCart((prevCart) =>
        prevCart.map((i) => (i.id === id ? updatedItem : i))
      );
    } catch (err) {
      console.error("Error decreasing quantity:", err);
    }
  };

  // ✅ Remove item
  const removeFromCart = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/cart/${id}`);
      setCart((prevCart) => prevCart.filter((i) => i.id !== id));
    } catch (err) {
      console.error("Error removing item:", err);
    }
  };

  // ✅ Get total amount
  const getTotal = () => {
    return cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        increaseQuantity,
        decreaseQuantity,
        removeFromCart,
        getTotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

// ✅ Custom hook
export const useCart = () => {
  return useContext(CartContext);
};
