import React, { useEffect, useState } from "react";

export default function Footer() {
  const [footerData, setFooterData] = useState(null);

  useEffect(() => {
    fetch("http://localhost:3000/footer")
      .then((res) => res.json())
      .then((data) => setFooterData(data))
      .catch((err) => console.error("Error fetching footer:", err));
  }, []);

  if (!footerData) return null;

  return (
    <footer id="footer" className="mt-5">
      <div className="container">
        <div className="row d-flex flex-wrap justify-content-between py-5">
          <div className="col-md-3 col-sm-6">
            <div className="footer-menu footer-menu-001">
              <div className="footer-intro mb-4">
                <a>
                  <img src={footerData.logo} alt="logo" />
                </a>
              </div>
              <p>{footerData.description}</p>
            </div>
          </div>

          <div className="col-md-3 col-sm-6">
            <div className="footer-menu footer-menu-002">
              <h5 className="widget-title text-uppercase mb-4">Quick Links</h5>
              <ul className="menu-list list-unstyled text-uppercase border-animation-left fs-6">
                {footerData.quickLinks.map((link, idx) => (
                  <li className="menu-item" key={idx}>
                    <a href={link.link} className="item-anchor">{link.name}</a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="col-md-3 col-sm-6">
            <div className="footer-menu footer-menu-003">
              <h5 className="widget-title text-uppercase mb-4">Help & Info</h5>
              <ul className="menu-list list-unstyled text-uppercase border-animation-left fs-6">
                {footerData.helpInfo.map((info, idx) => (
                  <li className="menu-item" key={idx}>
                    <a href={info.link} className="item-anchor">{info.name}</a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="col-md-3 col-sm-6">
            <div className="footer-menu footer-menu-004 border-animation-left">
              <h5 className="widget-title text-uppercase mb-4">Contact Us</h5>
              <p>
                Do you have any questions or suggestions?{" "}
                <a href={`mailto:${footerData.contact.email}`} className="item-anchor">
                  {footerData.contact.email}
                </a>
              </p>
              <p>
                Do you need support? Give us a call.{" "}
                <a href={`tel:${footerData.contact.phone}`} className="item-anchor">
                  {footerData.contact.phone}
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="border-top py-4">
        <div className="container d-flex justify-content-between align-items-center flex-wrap">
          <div className="d-flex flex-wrap">
            <div className="shipping me-3">
              <span>We ship with:</span>
              {footerData.shippingLogos.map((logo, idx) => (
                <img src={logo} alt="icon" key={idx} />
              ))}
            </div>
            <div className="payment-option">
              <span>Payment Option:</span>
              {footerData.paymentLogos.map((logo, idx) => (
                <img src={logo} alt="card" key={idx} />
              ))}
            </div>
          </div>
          <div className="text-end">
            <p>
              {footerData.copyright} Design by <b>{footerData.designer}</b>. 
              Distribution By <b>{footerData.distributor}</b>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
