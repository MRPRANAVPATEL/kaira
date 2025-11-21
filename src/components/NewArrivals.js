// src/components/NewArrivals.js
import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import AOS from "aos";
import "aos/dist/aos.css";

export default function NewArrivals() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    AOS.init({ duration: 800 });

    // Fetch products 
    fetch("http://localhost:3000/newArrivals")
      .then((res) => res.json())
      .then((data) => setProducts(data));

    // Fetch cart
    fetch("http://localhost:3000/cart")
      .then((res) => res.json())
      .then((data) => {
        setCart(data);
        setTotal(data.reduce((sum, item) => sum + Number(item.price), 0));
      });
  }, []);

  const handleAddToCart = async (product) => { 
    try {
      // Check if product already in cart
      const existing = cart.find((item) => item.id === product.id);
      if (existing) {
        alert("This product is already in your cart!");
        return;
      }

      const res = await fetch("http://localhost:3000/cart", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(product),
      });

      if (res.ok) {
        const newProduct = await res.json();
        setCart([...cart, newProduct]);
        setTotal((prev) => prev + Number(product.price));
        alert(`${product.title} added to cart!`);
      } else {
        alert("Error adding to cart (server error).");
      }
    } catch (error) {
      console.error("Add to cart failed:", error);
      alert("Error adding to cart (connection failed).");
    }
  };

  return (
    <section
      id="new-arrival"
      className="py-5 position-relative overflow-hidden"
      style={{ backgroundColor: "#fff" }}
    >
      <div className="container">
        <div className="d-flex flex-wrap justify-content-between align-items-center mt-5 mb-3">
          <h4 className="text-uppercase">Our New Arrivals</h4>
        </div>

        <div data-aos="zoom-out">
          <Swiper
            modules={[Pagination]}
            pagination={{ clickable: true }}
            spaceBetween={20}
            slidesPerView={4}
          >
            {products.map((product) => (
              <SwiperSlide key={product.id}>
                <div className="product-item image-zoom-effect link-effect text-center">
                  <div className="image-holder position-relative">
                    <img
                      src={product.img}
                      alt={product.title}
                      className="product-image img-fluid"
                    />
                    <button
                      className="add-to-cart-btn btn btn-dark mt-2"
                      onClick={() => handleAddToCart(product)}
                    >
                      Add to Cart
                    </button>
                  </div>
                  <div className="product-content text-center">
                    <h5 className="element-title text-uppercase fs-5 mt-3">
                      {product.title}
                    </h5>
                    <span>₹{Number(product.price).toFixed(2)}</span>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

      </div>

      <style>{`
        .product-item {
          position: relative;
          overflow: hidden;
        }
        .add-to-cart-btn {
          bottom: -50px;
          left: 50%;
          transform: translateX(-50%);
          opacity: 0;
          transition: all 0.3s ease;
        }
        .product-item:hover .add-to-cart-btn {
          bottom: 10px;
          opacity: 1;
        }
      `}</style>
    </section>
  );
}
