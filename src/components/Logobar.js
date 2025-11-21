// src/components/Logobar.js
import React, { useEffect, useState } from "react";

export default function Logobar() {
  const [logos, setLogos] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/logos")
      .then((res) => res.json())
      .then((data) => setLogos(data))
      .catch((err) => console.error("Error fetching logos:", err));
  }, []);

  return (
    <section className="logo-bar py-5 my-5">
      <div className="container">
        <div className="row">
          <div className="logo-content d-flex flex-wrap justify-content-between">
            {logos.map((logo) => (
              <a key={logo.id} href={logo.link}>
                <img src={logo.image} alt={`logo ${logo.id}`} className="logo-image img-fluid" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
