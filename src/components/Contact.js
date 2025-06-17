// src/components/Contact.js
import React, { useRef } from "react";
import emailjs from "@emailjs/browser";
import { FaYoutube, FaInstagram, FaTiktok } from "react-icons/fa";

export default function Contact({ mode, showAlert }) {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        "your_service_id", // Replace
        "your_template_id", // Replace
        form.current,
        "your_public_key"   // Replace
      )
      .then(
        (result) => {
          showAlert("Message sent successfully!", "success");
          form.current.reset();
        },
        (error) => {
          showAlert("Failed to send message.", "danger");
        }
      );
  };

  return (
    <div className={`contact-form text-${mode === "dark" ? "light" : "dark"}`}>
      <h2 className="mb-4">Contact Us</h2>
      <form ref={form} onSubmit={sendEmail}>
        <div className="mb-3">
          <input type="text" name="user_name" className="form-control" placeholder="Your Name" required />
        </div>
        <div className="mb-3">
          <input type="email" name="user_email" className="form-control" placeholder="Your Email" required />
        </div>
        <div className="mb-3">
          <textarea name="message" className="form-control" placeholder="Your Message" rows="5" required></textarea>
        </div>
        <button type="submit" className="btn btn-success">
          Send Message
        </button>
      </form>

      <div className="social-links mt-4">
        <h5>Follow us:</h5>
        <a href="https://youtube.com" target="_blank" rel="noreferrer" className="mx-2 text-danger">
          <FaYoutube size={30} />
        </a>
        <a href="https://instagram.com" target="_blank" rel="noreferrer" className="mx-2 text-pink">
          <FaInstagram size={30} />
        </a>
        <a href="https://tiktok.com" target="_blank" rel="noreferrer" className="mx-2 text-dark">
          <FaTiktok size={30} />
        </a>
      </div>
    </div>
  );
}
