// src/components/Video.js
import React, { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

export default function Video() {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    AOS.init({ duration: 800 });

    // Fetch videos from JSON Server
    fetch("http://localhost:3000/videos")
      .then((res) => res.json())
      .then((data) => setVideos(data))
      .catch((err) => console.error("Error fetching videos:", err));
  }, []);

  return (
    <section className="video py-5 overflow-hidden">
      <div className="container-fluid">
        <div className="row">
          {videos.map((vid) => (
            <div className="video-content open-up" data-aos="zoom-out" key={vid.id}>
              <div className="video-bg">
                <img src={vid.thumbnail} alt="video" className="video-image img-fluid" />
              </div>
              <div className="video-player">
                <a className="youtube" href={vid.youtubeLink}>
                  <img src={vid.patternImg} alt="pattern" className="text-rotate" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
