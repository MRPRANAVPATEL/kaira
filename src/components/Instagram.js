// src/components/Instagram.js
import React, { useEffect, useState } from "react";

export default function Instagram() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/instagram")
      .then((res) => res.json())
      .then((data) => setPosts(data))
      .catch((err) => console.error("Error fetching Instagram posts:", err));
  }, []);

  return (
    <section className="instagram position-relative">
      <div className="d-flex justify-content-center w-100 position-absolute bottom-0 z-1">
        <a
          href="https://www.instagram.com/hm/"
          className="btn btn-dark px-5"
        >
          Follow us on Instagram
        </a>
      </div>
      <div className="row g-0">
        {posts.map((post) => (
          <div className="col-6 col-sm-4 col-md-2" key={post.id}>
            <div className="insta-item">
              <a href={post.link} target="_blank" rel="noopener noreferrer">
                <img
                  src={post.image}
                  alt={`instagram ${post.id}`}
                  className="insta-image img-fluid"
                />
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
