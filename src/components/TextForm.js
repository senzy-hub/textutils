import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import jsPDF from "jspdf";
import { Document, Packer, Paragraph, TextRun } from "docx";
import { saveAs } from "file-saver";


export default function TextForm(props) {
  const exportDocx = async (text) => {
  const doc = new Document({
    sections: [{
      children: [new Paragraph(text)]
    }]
  });

  const blob = await Packer.toBlob(doc);
  saveAs(blob, "textutils-output.docx");
};

  const exportTxt = (text) => {
  const blob = new Blob([text], { type: "text/plain" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = "textutils-output.txt";
  link.click();
  URL.revokeObjectURL(link.href);
};

  const exportPdf = (text) => {
  const doc = new jsPDF();
  const lines = doc.splitTextToSize(text, 180); // wrap lines nicely
  doc.text(lines, 10, 10);
  doc.save("textutils-output.pdf");
};

  const [text, setText] = useState('');

  const handleTransform = (action) => {
    let newText = text;
    switch (action) {
      case 'UPPER': newText = text.toUpperCase(); break;
      case 'LOWER': newText = text.toLowerCase(); break;
      case 'DASH': newText = text.trim().split(/\s+/).join('-'); break;
      case 'UNDASH': newText = text.replace(/-/g, ' '); break;
      case 'EXTRASPACES': newText = text.split(/[ ]+/).join(' '); toast.success("✨ Extra spaces removed"); break;
      case 'CLEAR': newText = ''; toast.info("🧹 Text cleared!"); break;
      default: break;
    }
    setText(newText);
  };



  
  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    toast.success("📋 Copied to clipboard!");
  };

  return (
    
    <div
      className="container-fluid fade-in p-5 textform-wrapper"
      style={{
        backgroundColor: props.mode === 'dark' ? '#0e1629' : '#fdf6e3',
        color: props.mode === 'dark' ? '#ffffff' : '#3c2f14',
        minHeight: '100vh',
      }}
    >
      <ToastContainer />
      <h1 className="display-5 fw-bold mb-4 text-center golden-heading">{props.heading}</h1>

      <textarea
        className="form-control shadow-sm mb-3 golden-textarea"
        value={text}
        onChange={(e) => setText(e.target.value)}
        rows="5"
        style={{
          backgroundColor: props.mode === 'dark' ? '#1e1e2f' : '#fffaf0',
          color: props.mode === 'dark' ? '#ffd700' : '#3c2f14',
          border: '1px solid #d1a73c',
          fontSize: '1.1rem',
        }}
      ></textarea>

      <div className="d-flex flex-wrap gap-2 justify-content-center mb-4">
        <button disabled={!text} onClick={() => handleTransform('UPPER')} className="btn lux-btn-gold">Uppercase</button>
        <button disabled={!text} onClick={() => handleTransform('LOWER')} className="btn lux-btn-gold">Lowercase</button>
        <button disabled={!text} onClick={() => handleTransform('EXTRASPACES')} className="btn lux-btn-gold">Remove Spaces</button>
        <button disabled={!text} onClick={() => handleTransform('DASH')} className="btn lux-btn-gold">Add Dashes</button>
        <button disabled={!text} onClick={() => handleTransform('UNDASH')} className="btn lux-btn-gold">Remove Dashes</button>
        <button disabled={!text} onClick={() => handleTransform('CLEAR')} className="btn lux-btn-gold">Clear</button>
        <button disabled={!text} onClick={handleCopy} className="btn lux-btn-gold">Copy</button>
        <button disabled={!text} onClick={() => exportDocx(text)} className="btn lux-btn-gold">Export as DOCX</button>

      </div>

      <div className="text-center mb-4">
        <h4 className="text-gold">Summary</h4>
        <p className="lead">{text.split(/\s+/).filter((t) => t).length} words, {text.length} characters</p>
      </div>

      <div className="preview-section text-center">
        <h4 className="text-gold">Preview</h4>
        <p className="fst-italic opacity-75">{text || 'Nothing to preview yet!'}</p>
      </div>

      <center><footer className="user-select-none">
        © 2025 TextUtils | Made with 💎 by Senzy
      </footer></center>

      <style>{`
        .golden-heading {
          background: linear-gradient(to right, #FFD700,rgb(149, 145, 14),rgb(255, 254, 249));
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .lux-btn-gold {
          border: 2px solid #FFD700;
          color: #FFD700;
          background: transparent;
          border-radius: 50px;
          padding: 0.5rem 1rem;
          transition: all 0.3s ease;
          font-weight: 600;
        }

        .lux-btn-gold:hover {
          background: linear-gradient(to right, #FFD700, #FFB700);
          color: #1a1a1a;
          box-shadow: 0 8px 20px rgba(255, 215, 0, 0.4);
        }

        .golden-textarea:focus {
          border-color: #FFD700;
          box-shadow: 0 0 0 0.25rem rgba(255, 215, 0, 0.3);
        }

        .text-gold {
          color: #FFD700;
        }

        .fade-in {
          animation: fadeIn 0.8s ease-in;
        }

        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
