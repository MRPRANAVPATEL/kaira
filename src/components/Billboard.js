// src/components/Billboard.js
import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import AOS from "aos";
import "aos/dist/aos.css";

export default function Billboard() {
  const [slides, setSlides] = useState([]);

  useEffect(() => {
    AOS.init({ duration: 800 });

    // Fetch billboard slides from JSON Server
    fetch("http://localhost:3000/billboard")
      .then((res) => res.json())
      .then((data) => setSlides(data))
      .catch((err) => console.error("Error fetching billboard slides:", err));
  }, []);

  return (
    <section id="billboard" className="bg-light py-5">
      <div className="container">
        <div className="row justify-content-center">
          <h1 className="section-title text-center mt-4" data-aos="fade-up">
            New Collections
          </h1>
          <div className="col-md-6 text-center" data-aos="fade-up" data-aos-delay="300">
            <p>
            Kaira is a React JS e-commerce website with pages like Home, Products, Blog, and Cart.
It has a modern UI with Navbar, Footer, sliders, and animations.
User data is stored in `db.json` using JSON Server for login and registration.
After login, the user’s name appears in the Navbar for a personalized touch.

            </p>
          </div>
        </div>

        <div className="row">
          <div className="py-4 w-100" data-aos="fade-up" data-aos-delay="600">
            <Swiper
              modules={[Pagination]}
              pagination={{ clickable: true }}
              spaceBetween={20}
              slidesPerView={3}
            >
              {slides.map((slide) => (
                <SwiperSlide key={slide.id}>
                  <div className="banner-item image-zoom-effect">
                    <div className="image-holder">
                      <a>
                        <img src={slide.img} alt={slide.title} className="img-fluid" />
                      </a>
                    </div>
                    <div className="banner-content py-4">
                      <h5 className="element-title text-uppercase">
                        <a href="/" className="item-anchor">{slide.title}</a>
                      </h5>
                      <p>
                        Scelerisque duis aliquam qui lorem ipsum dolor amet,
                        consectetur adipiscing elit.
                      </p>
                      <div className="btn-left">
                        <a className="btn-link fs-6 text-uppercase item-anchor text-decoration-none">
                          Discover Now
                        </a>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </div>
    </section>
  );
}
