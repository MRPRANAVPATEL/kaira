// src/components/Testimonials.js
import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

export default function Testimonials() {
  const [testimonials, setTestimonials] = useState([]);

  useEffect(() => {
    // Fetch testimonials from JSON Server
    fetch("http://localhost:3000/testimonials")
      .then((res) => res.json())
      .then((data) => setTestimonials(data))
      .catch((err) => console.error("Error fetching testimonials:", err));
  }, []);

  return (
    <section className="testimonials py-5 bg-light">
      <div className="section-header text-center mt-5">
        <h3 className="section-title">WE LOVE GOOD COMPLIMENT</h3>
      </div>

      <Swiper
        modules={[Pagination]}
        pagination={{ clickable: true }}
        spaceBetween={20}
        slidesPerView={1}
        className="testimonial-swiper overflow-hidden my-5"
      >
        {testimonials.map((item) => (
          <SwiperSlide key={item.id}>
            <div className="testimonial-item text-center">
              <blockquote>
                <p>{item.text}</p>
                <div className="review-title text-uppercase">{item.reviewTitle}</div>
              </blockquote>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
