// src/components/Blog.js
import React, { useEffect, useState } from "react";

export default function Blog() {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/blogs")
      .then((res) => res.json())
      .then((data) => setBlogs(data))
      .catch((err) => console.error("Error fetching blogs:", err));
  }, []);

  return (
    <section className="blog py-5">
      <div className="container">
        <div className="d-flex flex-wrap justify-content-between align-items-center mt-5 mb-3">
          <h4 className="text-uppercase">Read Blog Posts</h4>
          <a href="/" className="btn-link">View All</a>
        </div>
        <div className="row">
          {blogs.map((post) => (
            <div className="col-md-4" key={post.id}>
              <article className="post-item">
                <div className="post-image">
                  <a href={post.link}>
                    <img
                      src={post.image}
                      alt={post.title}
                      className="post-grid-image img-fluid"
                    />
                  </a>
                </div>
                <div className="post-content d-flex flex-wrap gap-2 my-3">
                  <div className="post-meta text-uppercase fs-6 text-secondary">
                    <span className="post-category">{post.category} /</span>
                    <span className="meta-day">{post.date}</span>
                  </div>
                  <h5 className="post-title text-uppercase">
                    <a href={post.link}>{post.title}</a>
                  </h5>
                  <p>{post.excerpt}</p>
                </div>
              </article>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
