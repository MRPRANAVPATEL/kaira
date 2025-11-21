// src/components/BestSellers.js
import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import AOS from "aos";
import "aos/dist/aos.css";
import { useCart } from "./CartContext";  // ✅ useCart instead of CartContext

export default function BestSellers() {
  const [products, setProducts] = useState([]);
  const { addToCart } = useCart();  // ✅ get addToCart function from context

  useEffect(() => {
    AOS.init({ duration: 800 });

    // Fetch best sellers from JSON Server
    fetch("http://localhost:3000/bestSellers")
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.error("Error fetching best sellers:", err));
  }, []);

  return (
    <section id="best-sellers" className="py-5 bg-white position-relative overflow-hidden">
      <style>{`
        .product-item { position: relative; overflow: hidden; }
        .add-to-cart-btn {
          position: absolute; bottom: -50px; left: 50%; transform: translateX(-50%);
          background-color: #000; color: #fff; padding: 8px 16px; border: none;
          font-size: 14px; opacity: 0; transition: all 0.3s ease;
        }
        .product-item:hover .add-to-cart-btn { bottom: 10px; opacity: 1; }
      `}</style>

      <div className="container">
        <div className="d-flex flex-wrap justify-content-between align-items-center mt-5 mb-3">
          <h4 className="text-uppercase">Best Selling Items</h4>
          <a href="/" className="btn-link">View All Products</a>
        </div>

        <div data-aos="zoom-out">
          <Swiper
            modules={[Pagination]}
            pagination={{ clickable: true }}
            spaceBetween={20}
            slidesPerView={3}
          >
            {products.map((product) => (
              <SwiperSlide key={product.id}>
                <div className="product-item image-zoom-effect link-effect">
                  <div className="image-holder position-relative">
                    <a href="/">
                      <img src={product.img} alt={product.title} className="product-image img-fluid" />
                    </a>
                    {/* ✅ Add to Cart functionality */}
                    <button
                      className="add-to-cart-btn"
                      onClick={() => addToCart(product)}
                    >
                      Add to Cart
                    </button>
                  </div>
                  <div className="product-content">
                    <h5 className="text-uppercase fs-5 mt-3">
                      <a href="/">{product.title}</a>
                    </h5>
                    <a href="/" className="text-decoration-none">
                      <span>₹{product.price}</span>
                    </a>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
}
