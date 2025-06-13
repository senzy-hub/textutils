import React, { useState, useEffect, useRef } from "react";
import './App.css';
import Navbar from './components/Navbar';
import TextForm from './components/TextForm';
import Alert from './components/Alert';
import emailjs from '@emailjs/browser';

function App() {
  const [modee, setmodee] = useState("dark")
  const [mode, setMode] = useState("dark");
  const [alert, setAlert] = useState(null);
  const [page, setPage] = useState("textutils");
  const [feedback, setFeedback] = useState({ name: "", email: "", message: "" });
  const formRef = useRef();

  const showAlert = (message, type) => {
    setAlert({ msg: message, type: type });
    setTimeout(() => {
      setAlert(null);
    }, 1500);
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
    document.body.style.backgroundColor = mode === "dark" ? "#121212" : "#ffffff";
    document.body.style.color = mode === "dark" ? "#ffffff" : "#000000";
  }, [mode]);

  return (
    <>
      <Navbar title="TextUtils" setPage={setPage} />
      <Alert alert={alert} />
      <div className="container">
        {page === "home" ? (
          <div>
            <div>
  <h2>🏠 Welcome to TextUtils!</h2>
  <p><strong>Your Ultimate Online Text Processing Companion</strong></p>
  <p>
    TextUtils is a modern, browser-based tool designed to simplify your everyday text formatting and analysis needs. 
    Whether you're a writer, student, developer, or content creator, our powerful utilities help you transform and refine 
    your text quickly and efficiently.
  </p>

  <h3>💡 Why Use TextUtils?</h3>
  <ul>
    <li>🚀 <strong>Instant Word & Character Count</strong> – Stay on top of limits for social media, SEO, and academic assignments.</li>
    <li>🎯 <strong>Remove Extra Spaces</strong> – Clean up messy or copy-pasted text in one click.</li>
    <li>🔤 <strong>Text Case Conversion</strong> – Switch between uppercase, lowercase, title case and more.</li>
    <li>🌙 <strong>Dark Mode Support</strong> – Built for comfortable use day and night.</li>
    <li>⚡ <strong>Real-Time Updates</strong> – See changes as you type with zero lag.</li>
    <li>🧼 <strong>No Data Stored</strong> – All transformations happen in-browser — nothing gets saved or sent.</li>
  </ul>

  <h3>🎯 Who Uses TextUtils?</h3>
  <ul>
    <li>✅ <strong>Writers & Bloggers</strong> — for proofreading and editing</li>
    <li>✅ <strong>Students & Educators</strong> — for assignments and summaries</li>
    <li>✅ <strong>Developers</strong> — for code snippet cleanup and formatting</li>
    <li>✅ <strong>Marketers & SEO Specialists</strong> — for content optimization</li>
  </ul>

  <h3>✅ Key Benefits</h3>
  <ul>
    <li>No installation required — works instantly in your browser</li>
    <li>Free and easy to use</li>
    <li>Lightweight and fast, even on low-end devices</li>
    <li>Compatible with desktops, tablets, and mobile phones</li>
  </ul>
</div>

          </div>
        ) : page === "textutils" ? (
          <TextForm
            showAlert={showAlert}
            heading="✨ TextUtils - Word Counter, Character Counter, Remove Extra Spaces"
            mode={mode}
          />
        ) : page === "blog" ? (
          <div>
            <h2>📘 Welcome to the TextUtils Blog</h2>
            <p>Explore tips, updates, and tutorials to maximize your productivity with TextUtils!</p>

            <h3>🛠 Top Features You Should Know About</h3>
            <ul>
              <li>✅ Word & Character Counter – Ideal for social media, assignments, or SEO</li>
              <li>✅ Remove Extra Spaces – Clean messy text from copy-pastes</li>
              <li>✅ Case Converter – Instantly switch between Uppercase, Lowercase, Title Case</li>
            </ul>

            <h3>🧠 Tips to Boost Productivity</h3>
            <ul>
              <li>Use keyboard shortcuts to quickly copy/paste text in and out of TextUtils</li>
              <li>Use batch transformations for large text editing tasks</li>
              <li>Writers: check word count to match client or platform limits</li>
            </ul>

            <h3>📚 Recent Articles</h3>
            <ul>
              <li>How to Format Blog Posts for Readability</li>
              <li>Why Character Count Still Matters in 2025</li>
              <li>Case Studies: How Writers Use TextUtils to Improve Workflow</li>
            </ul>

            <h3>🚀 Upcoming Features</h3>
            <ul>
              <li>Grammar and Spell Checker</li>
              <li>PDF to Text Extractor</li>
              <li>Text Summarizer</li>
              <li>Language Translator</li>
              <li>Text-to-Speech</li>
            </ul>

            <h3>🌍 Why Browser-Based Tools Matter</h3>
            <p>TextUtils is 100% browser-based. No downloads. No data collection. Fast, lightweight, and secure for all users.</p>

            <h3>✍️ Did You Know?</h3>
            <ul>
              <li>Twitter's character limit is 280 — perfect for our character counter</li>
              <li>SEO meta titles should be under 60 characters</li>
              <li>Many resumes should stay under 2,000 characters</li>
            </ul>
<ul className="pagination" style={{ display: "flex", justifyContent: "center", listStyle: "none", padding: 0, margin: 0 }}>
  <li className="page-item" style={{ margin: 0, padding: 0 }}>
    <a className="page-link" href="https://www.instagram.com/senzy_ff_">Instagram</a>
  </li>
  <li className="page-item" style={{ margin: 0, padding: 0 }}>
    <a className="page-link" href="https://www.youtube.com/@Senzy_King">Youtube</a>
  </li>
  <li className="page-item" style={{ margin: 0, padding: 0 }}>
    <a className="page-link" href="https://www.tiktok.com/@senzy_ff_">TikTok</a>
  </li>
</ul>



          </div>
        ) : page === "contact" ? (
          <div>
            <h2>Contact Us</h2>
            <p>If you have any questions, suggestions, or feedback, feel free to reach out. We're here to help!</p>
            <ul style={{ lineHeight: "1.8" }}>
              <li><strong>Email:</strong> example@something.com</li>
            </ul>

            <h3>Send Us Your FeedBack:</h3>
            <form
              ref={formRef}
              onSubmit={sendEmail}
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "1rem",
                maxWidth: "500px",
                marginTop: "1rem",
              }}
            >
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                value={feedback.name}
                onChange={(e) => setFeedback({ ...feedback, name: e.target.value })}
                required
                style={{ padding: "0.6rem", borderRadius: "5px", border: "1px solid #ccc" }}
              />

              <input
                type="email"
                name="email"
                placeholder="Your Email"
                value={feedback.email}
                onChange={(e) => setFeedback({ ...feedback, email: e.target.value })}
                required
                style={{ padding: "0.6rem", borderRadius: "5px", border: "1px solid #ccc" }}
              />

              <textarea
                name="message"
                placeholder="Your Message"
                value={feedback.message}
                onChange={(e) => setFeedback({ ...feedback, message: e.target.value })}
                required
                rows={5}
                style={{ padding: "0.6rem", borderRadius: "5px", border: "1px solid #ccc" }}
              />

              <button
                type="submit"
                style={{
                  padding: "0.7rem",
                  borderRadius: "5px",
                  border: "none",
                  backgroundColor: "#007bff",
                  color: "#fff",
                  fontWeight: "bold",
                  cursor: "pointer",
                }}
              >
                Send Feedback
              </button>
            </form>
          
          </div>
        ) : (
          <div style={{ minHeight: "200px" }}></div>
        )}
      </div>
    </>
  );
}

export default App;
