import React, { useState } from 'react';
import './Pages.css';
import { featureFlags } from '../config/featureFlags';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically send the form data to your backend
    console.log('Form submitted:', formData);
    alert('Thank you for your message! I\'ll get back to you soon.');
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <div className="page-content">
      <div className="page-container">
        <h1>Contact Me</h1>
        <div className={`contact-content ${!featureFlags.showContactForm ? 'contact-content-centered' : ''}`}>
          <div className="contact-info">
            <h2>Get in Touch</h2>
            <p>
              I'm always interested in hearing from fellow artists, potential clients, 
              and art enthusiasts. Whether you have a question about my work, want to 
              discuss a commission, or just want to say hello, feel free to reach out!
            </p>
            
            <div className="contact-methods">
              <div className="contact-method">
                <h3>Email</h3>
                <p>For business inquiries and commissions</p>
                <a href="mailto:contact@radstarsaur.com" className="contact-link">
                  contact@radstarsaur.com
                </a>
              </div>
              
              <div className="contact-method">
                <h3>Social Media</h3>
                <p>Follow my latest work and updates</p>
                <a href="https://instagram.com/radstarsaur" target="_blank" rel="noopener noreferrer" className="contact-link">
                  @radstarsaur on Instagram
                </a>
              </div>
            </div>
          </div>
          
          {featureFlags.showContactForm && (
            <div className="contact-form">
              <h2>Send a Message</h2>
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="name">Name *</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="email">Email *</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="subject">Subject</label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="message">Message *</label>
                  <textarea
                    id="message"
                    name="message"
                    rows="6"
                    value={formData.message}
                    onChange={handleChange}
                    required
                  ></textarea>
                </div>
                
                <button type="submit" className="submit-btn">
                  Send Message
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Contact;
