// components/TextEditor.jsx
import React, { useState, useEffect } from 'react';

const TextEditor = ({ value, onChange, disabled }) => {
  const [wordCount, setWordCount] = useState(0);
  const [charCount, setCharCount] = useState(0);

  useEffect(() => {
    const words = value.trim() ? value.trim().split(/\s+/).length : 0;
    const chars = value.length;
    setWordCount(words);
    setCharCount(chars);
  }, [value]);

  const getWordCountColor = () => {
    if (wordCount < 60) return '#e74c3c';
    if (wordCount >= 100 && wordCount <= 140) return '#27ae60';
    return '#f39c12';
  };

  return (
    <div className="text-editor">
      <h2>Ihre Stellungnahme</h2>
      
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
        placeholder="Schreiben Sie hier Ihre Stellungnahme... Gehen Sie auf alle vier Punkte ein und begründen Sie Ihre Meinung."
        className="text-input"
        rows={15}
      />
      
      <div className="text-stats">
        <span className="word-count" style={{ color: getWordCountColor() }}>
          Wörter: {wordCount}/120
        </span>
        <span className="char-count">
          Zeichen: {charCount}
        </span>
      </div>
      
      <div className="writing-tips">
        <h4>Schreibtipps:</h4>
        <ul>
          <li>Verwenden Sie Konnektoren (jedoch, außerdem, deshalb)</li>
          <li>Strukturieren Sie Ihren Text klar</li>
          <li>Variieren Sie Ihren Wortschatz</li>
          <li>Gehen Sie auf alle vier Punkte ein</li>
        </ul>
      </div>
    </div>
  );
};

export default TextEditor;