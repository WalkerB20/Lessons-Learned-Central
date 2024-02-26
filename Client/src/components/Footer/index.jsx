import React from 'react';

export default function Footer (){
  return (
    <div className="footer">
    &lt;&lt;&lt; Copyright &copy; 2024, Lessons Learned Central &gt;&gt;&gt;
    <p>
      <button onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})} id="back-to-top">
        Back to Top
      </button>
      <a href="/about"><button id="about-page">About Page</button></a>
      <a href="/contact"><button id="contact-us">Contact Us</button></a>
      <a href="/"><button id="home-page">Home Page</button></a>
    </p>
    </div>
  )
}