import React from 'react';
import '../Styles/index.css';
import '../Styles/About.css';

const About = () => {
  return (
    <div className='about'>
      <h1 className='title-about'>About Lessons Learned Central</h1>
      <div className ='about-body'>
        <h2>Welcome to our military-focused social media platform!</h2>

          <div className='about-body-inner'>
            <p>Here, military members can share their experiences, training exercises, deployments, and After Action Reviews (AARs).</p>
            <p>Our goal is to create a community where military personnel can learn from each other's experiences and benefit from the lessons learned in the field.</p>
            <p>Whether you're a seasoned veteran or just starting your military journey, this platform is designed to help you grow, learn, and connect with others who share your passion for service.</p>
          </div>
        <p>Join us today and start sharing your valuable insights and lessons learned!</p>
      </div>
    </div>
  );
};

export default About;
