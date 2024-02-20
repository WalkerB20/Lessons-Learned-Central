import React from 'react';
//import '../index.css';

export default function Footer (){
  return (
    <div class="footer">
    &lt;&lt;&lt; &copy; <a href="about.html">Copyright Team AAR-LLC</a> &gt;&gt;&gt;
    <p>
      <button onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})} id="back-to-top">
        Back to Top
      </button>
    </p>
    </div>
  )
}