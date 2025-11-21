// src/components/RelatedProducts.js
import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

export default function RelatedProducts() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/relatedProducts")
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.error("Error fetching related products:", err));
  }, []);

  return (
    <section className="related-products py-5">
      <div className="container">
        <style>{`
          .product-item {
            position: relative;
            overflow: hidden;
          }
          .add-to-cart-btn {
            position: absolute;
            bottom: -50px;
            left: 50%;
            transform: translateX(-50%);
            background-color: #000;
            color: #fff;
            padding: 8px 16px;
            border: none;
            font-size: 14px;
            opacity: 0;
            transition: all 0.3s ease;
          }
          .product-item:hover .add-to-cart-btn {
            bottom: 150px;
            opacity: 1;
          }
        `}</style>

        <div className="section-header d-flex justify-content-between align-items-center mb-4">
          <h4 className="section-title text-uppercase">You May Also Like</h4>
          <a className="btn-link">View All Products</a>
        </div>

        <Swiper spaceBetween={20} slidesPerView={4} className="product-swiper my-4">
          {products.map((product) => (
            <SwiperSlide key={product.id}>
              <div className="product-item text-center">
                <div className="image-holder position-relative">
                  <a href={product.link}>
                    <img src={product.image} alt={product.name} className="product-image img-fluid" />
                  </a>
                  <a href={product.link} className="btn-icon btn-wishlist position-absolute top-0 end-0"></a>
                </div>
                <div className="product-content mt-3">
                  <h5 className="text-uppercase fs-5">
                    <a href={product.link}>{product.name}</a>
                  </h5>
                  <div className="price-and-cart mt-2">
                    <span className="price">${product.price.toFixed(2)}</span>
                    <button className="add-to-cart-btn">Add to Cart</button>
                    <button className="btn btn-sm btn-outline-dark position-absolute" style={{ top: "10px", right: "10px" }}>
                      Wishlist
                    </button>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
