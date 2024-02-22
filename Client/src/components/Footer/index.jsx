import React from 'react';

export default function Footer (){
  return (
    <div class="footer">
    &lt;&lt;&lt; &copy; <a href="about.html">Copyright Team AAR</a> &gt;&gt;&gt;
    <p>
      <button onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})} id="back-to-top">
        Back to Top
      </button>
    </p>
    </div>
  )
}