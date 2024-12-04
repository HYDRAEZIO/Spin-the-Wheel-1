"use client";

import React from "react";
import './styles/landing.css';

const LandingPage = () => {
  return (
    <div>
      {/* Hero Section */}
      <header className="hero">
        <h1>Shree Aadinath Mercantile and Exports Pvt Ltd</h1>
        <p>Your trusted partner in quality products and services</p>
        <a href="/spin">Spin the Wheel</a>
      </header>

      {/* About Us Section */}
      <section className="about">
        <h2>About Us</h2>
        <p>
          At Shree Aadinath Mercantile and Exports Pvt Ltd, we specialize in delivering
          high-quality products from various brands. Our mission is to provide
          excellence in every aspect of our business and foster long-term
          partnerships.
        </p>
      </section>

      {/* Products Section */}
      <section className="products">
        <h2>Our Products</h2>
        <div className="grid">
          <div className="card">
            <h3>Product Category 1</h3>
            <p>
              Explore a wide range of products under this category, known for
              quality and durability.
            </p>
          </div>
          <div className="card">
            <h3>Product Category 2</h3>
            <p>
              Discover the latest offerings from leading brands in this
              category.
            </p>
          </div>
          <div className="card">
            <h3>Product Category 3</h3>
            <p>
              High-performance products tailored to meet your unique needs.
            </p>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="cta">
        <h2>Join Us at the Exhibition</h2>
        <p>Visit our booth to explore our offerings and win exciting discounts.</p>
        <a href="/spin">Spin the Wheel</a>
      </section>

      {/* Footer */}
      <footer>
        <p>© 2024 Shree Aadinath Mercantile and Exports Pvt Ltd</p>
      </footer>
    </div>
  );
};

export default LandingPage;