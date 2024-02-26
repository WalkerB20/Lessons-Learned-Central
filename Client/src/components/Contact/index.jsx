import React, { useState } from 'react';
import '../Styles/Contact.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Perform form submission logic here
    console.log(formData);
  };

  return (
    <div className="contact">

        <div className = 'title-container'>
          <h1 className = "title-contact">Contact Us</h1>
          <p>Have a question or comment? Fill out the form below to contact us!</p>
        </div>

      <div>

        <form className="contact-form" onSubmit={handleSubmit}>

          <label htmlFor="name">
            Name:
          </label>

          <input type="text" id="name" name="name" value={formData.name} onChange={handleInputChange} />

          <label htmlFor="email">Email:</label>
          <input type="email" id="email" name="email" value={formData.email} onChange={handleInputChange} />

          <label htmlFor="message">Message:</label>
          <textarea id="message" name="message" value={formData.message} onChange={handleInputChange}></textarea>

          <button type="submit">Submit</button>
          {formData.submitted && (
          <p>Thank you for contacting us! We will reach out to you at our earliest convenience.</p>

      )}
      </form>
      </div>
    </div>
  );
};

export default Contact;
