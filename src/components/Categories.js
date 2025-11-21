// src/components/Categories.js
import React, { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

export default function Categories() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    AOS.init({ duration: 800 });

    // Fetch categories from JSON Server
    fetch("http://localhost:3000/categories")
      .then((res) => res.json())
      .then((data) => setCategories(data))
      .catch((err) => console.error("Error fetching categories:", err));
  }, []);

  return (
    <section className="categories overflow-hidden">
      <div className="container">
        <div className="open-up" data-aos="zoom-out">
          <div className="row">
            {categories.map((cat) => (
              <div className="col-md-4" key={cat.id}>
                <div className="cat-item image-zoom-effect">
                  <div className="image-holder">
                    <a href={cat.link}>
                      <img src={cat.img} alt={cat.title} className="product-image img-fluid" />
                    </a>
                  </div>
                  <div className="category-content">
                    <div className="product-button">
                      <a href={cat.link} className="btn btn-common text-uppercase">
                        {cat.title}
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
