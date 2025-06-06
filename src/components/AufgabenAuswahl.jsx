// components/AufgabenAuswahl.jsx
import React from 'react';

const AufgabenAuswahl = ({ aufgaben, selectedVariante, onSelectVariante }) => {
  return (
    <div className="aufgaben-auswahl">
      <h2>Aufgabe wählen</h2>
      
      {Object.entries(aufgaben).map(([key, aufgabe]) => (
        <div key={key} className="aufgabe-card">
          <div className="aufgabe-header">
            <label>
              <input
                type="radio"
                name="variante"
                value={key}
                checked={selectedVariante === key}
                onChange={(e) => onSelectVariante(e.target.value)}
              />
              <strong>Variante {key}: {aufgabe.title}</strong>
            </label>
          </div>
          
          {selectedVariante === key && (
            <div className="aufgabe-details">
              <div className="aussagen">
                <h4>{key === 'A' ? 'Aussagen:' : 'Schlagzeilen:'}</h4>
                {(aufgabe.aussagen || aufgabe.schlagzeilen).map((item, index) => (
                  <div key={index} className="aussage">
                    "{item}"
                  </div>
                ))}
              </div>
              
              <div className="punkte">
                <h4>Gehen Sie auf folgende Punkte ein:</h4>
                <ol>
                  {aufgabe.punkte.map((punkt, index) => (
                    <li key={index}>{punkt}</li>
                  ))}
                </ol>
              </div>
              
              <div className="hinweis">
                <strong>Hinweis:</strong> Schreiben Sie circa 120 Wörter.
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default AufgabenAuswahl;