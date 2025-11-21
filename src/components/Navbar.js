import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  // Check if user is logged in (from localStorage)
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  // Logout function
  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    navigate("/login");
  };

  return (
    <div>
      <nav className="navbar navbar-expand-lg bg-light text-uppercase fs-6 p-3 border-bottom align-items-center">
        <div className="container-fluid">
          <div className="row justify-content-between align-items-center w-100">
            {/* Logo */}
            <div className="col-auto">
              <Link to="/" className="navbar-brand text-white">
                <img src="images/main-logo.png" alt="logo" />
              </Link>
            </div>

            {/* Menu */}
            <div className="col-auto">
              <button
                className="navbar-toggler"
                type="button"
                data-bs-toggle="offcanvas"
                data-bs-target="#offcanvasNavbar"
                aria-controls="offcanvasNavbar"
              >
                <span className="navbar-toggler-icon"></span>
              </button>

              <div
                className="offcanvas offcanvas-end"
                tabIndex="-1"
                id="offcanvasNavbar"
                aria-labelledby="offcanvasNavbarLabel"
              >
                <div className="offcanvas-header">
                  <h5 className="offcanvas-title" id="offcanvasNavbarLabel">
                    Menu
                  </h5>
                  <button
                    type="button"
                    className="btn-close text-reset"
                    data-bs-dismiss="offcanvas"
                    aria-label="Close"
                  ></button>
                </div>

                <div className="offcanvas-body">
                  <ul className="navbar-nav justify-content-end flex-grow-1 gap-1 gap-md-5 pe-3">
                    <li className="nav-item dropdown">
                      <Link to="/" className="nav-link">
                        Home
                      </Link>
                    </li>
                    <li className="nav-item dropdown">
                      <a
                        className="nav-link dropdown-toggle"
                        id="dropdownShop"
                        data-bs-toggle="dropdown"
                        aria-haspopup="true"
                        aria-expanded="false"
                      >
                        Shop
                      </a>
                      <ul
                        className="dropdown-menu list-unstyled"
                        aria-labelledby="dropdownShop"
                      >
                        <li>
                          <a className="dropdown-item item-anchor">Shop Sidebar</a>
                        </li>
                        <li>
                          <a className="dropdown-item item-anchor">Shop Three Column</a>
                        </li>
                        <li>
                          <a className="dropdown-item item-anchor">Shop Three Column Wide</a>
                        </li>
                        <li>
                          <a className="dropdown-item item-anchor">Shop Four Column</a>
                        </li>
                        <li>
                          <a className="dropdown-item item-anchor">Shop Four Column Wide</a>
                        </li>
                        <li>
                          <a className="dropdown-item item-anchor">Shop Six Column</a>
                        </li>
                        <li>
                          <a className="dropdown-item item-anchor">Shop Six Column Wide</a>
                        </li>
                        <li>
                          <a className="dropdown-item item-anchor">Single Product</a>
                        </li>
                        <li>
                          <a className="dropdown-item item-anchor">Single Product V2</a>
                        </li>
                      </ul>
                    </li>
                    <li className="nav-item dropdown">
                      <a
                        className="nav-link dropdown-toggle"
                        id="dropdownBlog"
                        data-bs-toggle="dropdown"
                        aria-haspopup="true"
                        aria-expanded="false"
                      >
                        Blog
                      </a>
                      <ul
                        className="dropdown-menu list-unstyled"
                        aria-labelledby="dropdownBlog"
                      >
                        <li>
                          <a className="dropdown-item item-anchor">Blog Classic</a>
                        </li>
                        <li>
                          <a className="dropdown-item item-anchor">Blog Grid with Sidebar</a>
                        </li>
                        <li>
                          <a className="dropdown-item item-anchor">Blog Grid Four Column</a>
                        </li>
                        <li>
                          <a className="dropdown-item item-anchor">Blog No Sidebar</a>
                        </li>
                        <li>
                          <a className="dropdown-item item-anchor">Blog Right Sidebar</a>
                        </li>
                        <li>
                          <a className="dropdown-item item-anchor">Single Post</a>
                        </li>
                        <li>
                          <a className="dropdown-item item-anchor">Single Post No Sidebar</a>
                        </li>
                      </ul>
                    </li>
                    <li className="nav-item dropdown">
                      <a
                        className="nav-link dropdown-toggle"
                        id="dropdownPages"
                        data-bs-toggle="dropdown"
                        aria-haspopup="true"
                        aria-expanded="false"
                      >
                        Pages
                      </a>
                      <ul
                        className="dropdown-menu list-unstyled"
                        aria-labelledby="dropdownPages"
                      >
                        <li><a className="dropdown-item item-anchor">About</a></li>
                        <li><a className="dropdown-item item-anchor">Cart</a></li>
                        <li><a className="dropdown-item item-anchor">Checkout</a></li>
                        <li><a className="dropdown-item item-anchor">Coming Soon</a></li>
                        <li><a className="dropdown-item item-anchor">Contact</a></li>
                        <li><a className="dropdown-item item-anchor">Error Page</a></li>
                        <li><a className="dropdown-item item-anchor">FAQs</a></li>
                        <li><a className="dropdown-item item-anchor">My Account</a></li>
                        <li><a className="dropdown-item item-anchor">Order Tracking</a></li>
                        <li><a className="dropdown-item item-anchor">Wishlist</a></li>
                      </ul>
                    </li>
                    <li className="nav-item">
                      <a className="nav-link">Blog</a>
                    </li>
                    <li className="nav-item">
                      <a className="nav-link">Contact</a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Right section: Login/Register or User Info */}
            <div className="col-3 col-lg-auto">
              <ul className="list-unstyled d-flex m-0 align-items-center">
                {user ? (
                  <>
                    <li className="d-none d-lg-block text-dark mx-3">
                      👤 {user.name} ({user.contact})
                    </li>
                    <li className="d-none d-lg-block">
                      <button
                        onClick={handleLogout}
                        className="btn btn-sm btn-danger mx-3"
                      >
                        Logout
                      </button>
                    </li>
                  </>
                ) : (
                  <li className="d-none d-lg-block">
                    <Link to="/login" className="text-uppercase mx-3">
                      Login
                    </Link>
                    <Link to="/register" className="text-uppercase mx-3">
                      Register
                     </Link>
                  </li>
                )}
                <li className="d-none d-lg-block">
                  <a
                    className="text-uppercase mx-3"
                    data-bs-toggle="offcanvas"
                    data-bs-target="#offcanvasCart"
                    aria-controls="offcanvasCart"
                  >
                    Cart
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}
