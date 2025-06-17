import React, { useState, useEffect, useRef } from "react";
import './App.css';
import Navbar from './components/Navbar';
import TextForm from './components/TextForm';
import Alert from './components/Alert';
import emailjs from '@emailjs/browser';

function App() {
  const [mode, setMode] = useState("dark");
  const [alert, setAlert] = useState(null);
  const [page, setPage] = useState("home");
  const [feedback, setFeedback] = useState({ name: "", email: "", message: "" });
  const formRef = useRef();
  const [searchQuery, setSearchQuery] = useState("");
  const [animating, setAnimating] = useState(false);

  const showAlert = (message, type) => {
    setAlert({ msg: message, type });
    setTimeout(() => setAlert(null), 1500);
  };

  const sendEmail = (e) => {
    e.preventDefault();
    emailjs.sendForm(
      'your_service_id',
      'your_template_id',
      formRef.current,
      'your_public_key'
    ).then(
      (result) => {
        showAlert(`Thank you, ${feedback.name}! Your message has been sent.`, "success");
        setFeedback({ name: "", email: "", message: "" });
      },
      (error) => {
        showAlert("Failed to send feedback. Please try again later.", "danger");
      }
    );
  };

  useEffect(() => {
    document.body.style.backgroundColor = mode === "dark" ? "#000000" : "#ffffff";
    document.body.style.color = mode === "dark" ? "#ffffff" : "#000000";
  }, [mode]);

  useEffect(() => {
    setAnimating(true);
    const timer = setTimeout(() => setAnimating(false), 400);
    return () => clearTimeout(timer);
  }, [page]);

  return (
    <>
      <Navbar setPage={setPage} setSearchQuery={setSearchQuery} />
      <Alert alert={alert} />

      <div className={`container fade-slide-in ${animating ? "animating" : ""}`}>
        {page === "home" && (
          <section className="home-hero">
            <div className="home-content">
              <h1 className="home-title">🚀 Welcome to <span className="highlight">TextUtils</span></h1>
              <p className="home-description">
                A powerful, lightweight, and browser-based text manipulation tool that helps you clean, format, and analyze your text quickly and easily.
              </p>
              <ul className="feature-list">
                <li>✅ Word & Character Counting</li>
                <li>✅ Remove Extra Spaces</li>
                <li>✅ Case Conversion (Uppercase, Lowercase)</li>
                <li>✅ Add Dash, Remove Dash</li>
              </ul>
              <button className="get-started-btn" onClick={() => setPage("textutils")}>
                ✨ Get Started
              </button>
            </div>
            <div className="hero-image">
              {/* You can add an image here */}
            </div>
          </section>
        )}

        {page === "textutils" && (
          <TextForm
            showAlert={showAlert}
            heading="✨ TextUtils - Word Counter, Character Counter, Remove Extra Spaces"
            mode={mode}
          />
        )}

        {page === "features" && (
          <section>
            <h2>🔧 Powerful Features of TextUtils</h2>
            <p>Explore the rich set of features that make text editing a breeze:</p>
            <ul className="feature-list">
              <li>✅ Word & Character Counting</li>
              <li>✅ Remove Extra Spaces</li>
              <li>✅ Case Conversion (Uppercase, Lowercase)</li>
              <li>✅ Add Dash, Remove Dash</li>
              <li>🌐 Multi-language Text Translation</li>
              <li>🔍 Keyword Density Analyzer (SEO Tools)</li>
              <li>🧠 AI Text Summarizer (Quick Insights)</li>
              <li>📄 Export to PDF, DOCX, TXT</li>
              <li>🗣️ Text-to-Speech Support (TTS)</li>
              <li>🎨 Stylish Text Generator (Fancy Fonts & Emojis)</li>
            </ul>
            <p>We’re constantly adding more! Stay tuned 🚀</p>
          </section>
        )}

        {page === "blog" && (
          <div>
            <h2>📘 Welcome to the TextUtils Blog</h2>
            <p>Follow us on social platforms:</p>
            <ul className="pagination" style={{ display: "flex", justifyContent: "center", gap: "10px", listStyle: "none" }}>
              <li><a className="page-link" href="https://www.instagram.com/senzy_ff_" target="_blank" rel="noreferrer">Instagram</a></li>
              <li><a className="page-link" href="https://www.youtube.com/@Senzy_King" target="_blank" rel="noreferrer">YouTube</a></li>
              <li><a className="page-link" href="https://www.tiktok.com/@senzy_ff_" target="_blank" rel="noreferrer">TikTok</a></li>
            </ul>
          </div>
        )}

        {page === "contact" && (
          <div>
            <h2>📩 Contact Us</h2>
            <form ref={formRef} onSubmit={sendEmail} className="contact-form">
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                value={feedback.name}
                onChange={(e) => setFeedback({ ...feedback, name: e.target.value })}
                required
              />
              <input
                type="email"
                name="email"
                placeholder="Your Email"
                value={feedback.email}
                onChange={(e) => setFeedback({ ...feedback, email: e.target.value })}
                required
              />
              <textarea
                name="message"
                placeholder="Your Message"
                value={feedback.message}
                onChange={(e) => setFeedback({ ...feedback, message: e.target.value })}
                required
              />
              <button type="submit">Send Message</button>
            </form>
          </div>
        )}
      </div>

      <style>{`
        .fade-slide-in {
          opacity: 1;
          transform: translateY(0);
          transition: opacity 0.4s ease, transform 0.4s ease;
        }
        .fade-slide-in.animating {
          opacity: 0;
          transform: translateY(15px);
        }

        .get-started-btn {
          padding: 0.9rem 1.5rem;
          background-color: #007bff;
          color: #fff;
          border: none;
          border-radius: 10px;
          font-size: 1rem;
          cursor: pointer;
          transition: background 0.3s ease, transform 0.3s ease;
        }

        .get-started-btn:hover {
          background-color: #0056b3;
          transform: scale(1.05);
        }

        .feature-list {
          margin-top: 1rem;
          padding-left: 1.2rem;
        }
        .feature-list li {
          margin-bottom: 0.5rem;
        }

        .contact-form {
          display: flex;
          flex-direction: column;
          gap: 1rem;
          margin-top: 1rem;
        }

        .contact-form input,
        .contact-form textarea {
          padding: 0.75rem;
          border-radius: 8px;
          border: 1px solid #ccc;
          font-size: 1rem;
        }

        .contact-form button {
          padding: 0.75rem;
          background: #28a745;
          color: #fff;
          border: none;
          border-radius: 8px;
          cursor: pointer;
          font-size: 1rem;
        }

        .contact-form button:hover {
          background: #218838;
        }
      `}</style>
    </>
  );
}

export default App;
