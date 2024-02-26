import React from 'react';
import '../Styles/Footer.css';

export default function Footer (){
  return (
    <div className="footer">

      <p className="footer-buttons">
        <button
          onClick={() =>
          window.scrollTo({top: 0, behavior: 'smooth'})}
          id="back-to-top">
          Back to Top
        </button>
        <a href="/about">
        <button id="about-page">
          About
        </button></a>
        <a href="/contact">
        <button id="contact-us">
          Contact Us
        </button></a>
        <a href="/">
        <button id="home-page">
          Home
        </button></a>
      </p>
      <div className="copyright">
        &lt;&lt;&lt; Copyright &copy; 2024, Lessons Learned Central &gt;&gt;&gt;
      </div>
    </div>
  )
}