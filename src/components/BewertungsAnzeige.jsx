// components/BewertungsAnzeige.jsx
import React from 'react';

const BewertungsAnzeige = ({ bewertung }) => {
  const { bewertung: punkte, feedback, korrekturen, tipps, meta } = bewertung;
  
  const kriterienLabels = {
    K: 'Kommunikative Angemessenheit',
    T: 'Textaufbau/Textkohärenz',
    L: 'Lexik/Ausdruck',
    F: 'Formale Richtigkeit'
  };

  const maxPunkte = { K: 2, T: 3, L: 5, F: 5 };

  const getScoreColor = (score, max) => {
    const percentage = (score / max) * 100;
    if (percentage >= 80) return '#27ae60';
    if (percentage >= 60) return '#f39c12';
    return '#e74c3c';
  };

  const getOverallGrade = () => {
    const percentage = (punkte.gesamt / 15) * 100;
    if (percentage >= 80) return { grade: 'Sehr gut', color: '#27ae60' };
    if (percentage >= 70) return { grade: 'Gut', color: '#2ecc71' };
    if (percentage >= 60) return { grade: 'Befriedigend', color: '#f39c12' };
    if (percentage >= 50) return { grade: 'Ausreichend', color: '#e67e22' };
    return { grade: 'Nicht bestanden', color: '#e74c3c' };
  };

  const overallGrade = getOverallGrade();

  return (
    <div className="bewertung-anzeige">
      <h2>Bewertung</h2>
      
      <div className="gesamtbewertung">
        <div className="gesamt-punkte">
          <span className="punkte-zahl">{punkte.gesamt}/15</span>
          <span 
            className="note" 
            style={{ color: overallGrade.color }}
          >
            {overallGrade.grade}
          </span>
        </div>
      </div>

      <div className="kriterien-bewertung">
        <h3>Detailbewertung</h3>
        {Object.entries(kriterienLabels).map(([key, label]) => (
          <div key={key} className="kriterium">
            <div className="kriterium-header">
              <span className="kriterium-name">{label}</span>
              <span className="kriterium-punkte">
                {punkte[key]}/{maxPunkte[key]}
              </span>
            </div>
            <div className="progress-bar">
              <div 
                className="progress-fill"
                style={{
                  width: `${(punkte[key] / maxPunkte[key]) * 100}%`,
                  backgroundColor: getScoreColor(punkte[key], maxPunkte[key])
                }}
              />
            </div>
          </div>
        ))}
      </div>

      <div className="feedback-section">
        <h3>Feedback</h3>
        
        {feedback.positiv.length > 0 && (
          <div className="feedback-positiv">
            <h4>👍 Ihre Stärken:</h4>
            <ul>
              {feedback.positiv.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>
        )}

        {feedback.verbesserungen.length > 0 && (
          <div className="feedback-verbesserungen">
            <h4>💡 Verbesserungsvorschläge:</h4>
            <ul>
              {feedback.verbesserungen.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {korrekturen.length > 0 && (
        <div className="korrekturen-section">
          <h3>Korrekturen</h3>
          {korrekturen.map((korrektur, index) => (
            <div key={index} className="korrektur">
              <div className="korrektur-original">
                <strong>Original:</strong> {korrektur.original}
              </div>
              <div className="korrektur-verbessert">
                <strong>Korrigiert:</strong> {korrektur.korrigiert}
              </div>
              <div className="korrektur-erklaerung">
                <strong>Erklärung:</strong> {korrektur.erklaerung}
              </div>
            </div>
          ))}
        </div>
      )}

      {tipps.length > 0 && (
        <div className="tipps-section">
          <h3>💡 Tipps für bessere Texte</h3>
          <ul>
            {tipps.map((tipp, index) => (
              <li key={index}>{tipp}</li>
            ))}
          </ul>
        </div>
      )}

      {meta && (
        <div className="meta-info">
          <small>
            Wortanzahl: {meta.wortanzahl} | 
            AI-Service: {meta.aiService} | 
            Bewertung vom: {new Date(meta.timestamp).toLocaleString('de-DE')}
          </small>
        </div>
      )}
    </div>
  );
};

export default BewertungsAnzeige;