import React, { useState } from 'react';

const ContactSection = () => {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [status, setStatus] = useState(null); // { type: 'success'|'error', message: string }

  function onChange(e) {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  }

  function onSubmit(e) {
    e.preventDefault();
    const { name, email, subject, message } = form;
    if (!name || !email || !subject || !message) {
      setStatus({ type: 'error', message: 'Please fill in all required fields.' });
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setStatus({ type: 'error', message: 'Please enter a valid email address.' });
      return;
    }
    setStatus({ type: 'success', message: "Thank you for your message! We'll get back to you within 24 hours." });
    setForm({ name: '', email: '', subject: '', message: '' });
  }

  return (
    <section className="contact-section" id="contact">
      <div className="container">
        <div className="section-header">
          <h2>Get in Touch</h2>
          <p>Have questions about our products or need a custom order? We'd love to hear from you.</p>
        </div>
        <div className="contact-content">
          <div className="contact-info">
            <h3>Contact Information</h3>
            <div className="contact-item">
              <h4>Address</h4>
              <p>
                M/s Indiana Grey Pvt Ltd<br />
                No 105, 1st Floor U.P.Tannery Compound<br />
                Asharfabad Jajmau Kanpur-208010<br />
                Uttar Pradesh, India
              </p>
            </div>
            <div className="contact-item">
              <h4>Contact Person</h4>
              <p>Parvez Ahmed</p>
            </div>
            <div className="contact-item">
              <h4>Phone</h4>
              <p>+91 7007397694</p>
            </div>
            <div className="contact-item">
              <h4>Email</h4>
              <p>info@indianagrey.com</p>
            </div>
          </div>
          <form className="contact-form" id="contact-form" onSubmit={onSubmit}>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="name" className="form-label">Name</label>
                <input type="text" id="name" name="name" className="form-control" required value={form.name} onChange={onChange} />
              </div>
              <div className="form-group">
                <label htmlFor="email" className="form-label">Email</label>
                <input type="email" id="email" name="email" className="form-control" required value={form.email} onChange={onChange} />
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="subject" className="form-label">Subject</label>
              <select id="subject" name="subject" className="form-control" required value={form.subject} onChange={onChange}>
                <option value="">Select a subject</option>
                <option value="general">General Inquiry</option>
                <option value="custom-order">Custom Order</option>
                <option value="product-info">Product Information</option>
                <option value="warranty">Warranty Claim</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="message" className="form-label">Message</label>
              <textarea id="message" name="message" className="form-control" rows="5" required value={form.message} onChange={onChange}></textarea>
            </div>
            <button type="submit" className="btn btn--primary btn--full-width">Send Message</button>
            {status && (
              <div style={{ marginTop: 12, color: status.type === 'success' ? '#10b981' : '#ef4444' }}>{status.message}</div>
            )}
          </form>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;