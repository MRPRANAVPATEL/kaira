// src/components/Collection.js
import React, { useEffect, useState } from "react";

export default function Collection() {
  const [collections, setCollections] = useState([]);

  useEffect(() => {
    // Fetch collections from JSON Server
    fetch("http://localhost:3000/collections")
      .then((res) => res.json())
      .then((data) => setCollections(data))
      .catch((err) => console.error("Error fetching collections:", err));
  }, []);

  return (
    <section className="collection bg-light position-relative py-5">
      <div className="container">
        <div className="row">
          {collections.map((col) => (
            <div className="collection-item d-flex flex-wrap my-5" key={col.id}>
              <div className="col-md-6 column-container">
                <div className="image-holder">
                  <img src={col.img} alt={col.title} className="product-image img-fluid" />
                </div>
              </div>
              <div className="col-md-6 column-container bg-white">
                <div className="collection-content p-5 m-0 m-md-5">
                  <h3 className="element-title text-uppercase">{col.title}</h3>
                  <p>{col.description}</p>
                  <a href={col.link} className="btn btn-dark text-uppercase mt-3">
                    Shop Collection
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
