// App.jsx
import React, { useState, useEffect } from 'react';
import './App.css';

// Komponenten
import AufgabenAuswahl from './components/AufgabenAuswahl';
import BewertungsAnzeige from './components/BewertungsAnzeige';
import LoadingSpinner from './components/LoadingSpinner';
import TextEditor from './components/TextEditor';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

function App() {
  const [aufgaben, setAufgaben] = useState({});
  const [selectedVariante, setSelectedVariante] = useState('');
  const [userText, setUserText] = useState('');
  const [bewertung, setBewertung] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [aiService, setAiService] = useState('openai');

  // Aufgaben laden
  useEffect(() => {
    fetch(`${API_BASE_URL}/api/aufgaben`)
      .then(res => res.json())
      .then(data => setAufgaben(data))
      .catch(err => setError('Aufgaben konnten nicht geladen werden'));
  }, []);

  const handleSubmit = async () => {
    if (!selectedVariante || !userText.trim()) {
      setError('Bitte wählen Sie eine Aufgabe und schreiben Sie einen Text');
      return;
    }

    setLoading(true);
    setError('');
    setBewertung(null);

    try {
      const response = await fetch(`${API_BASE_URL}/api/bewerten`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          variante: selectedVariante,
          text: userText,
          aiService: aiService
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Bewertung fehlgeschlagen');
      }

      setBewertung(data);
      console.log(bewertung)
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setSelectedVariante('');
    setUserText('');
    setBewertung(null);
    setError('');
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1>ÖSD B2 Stellungnahme Trainer</h1>
        <p>Üben Sie das Schreiben von Stellungnahmen für die ÖSD B2-Prüfung</p>
      </header>

      <main className="app-main">
        {error && (
          <div className="error-message">
            <strong>Fehler:</strong> {error}
          </div>
        )}

        <div className="content-grid">
          <div className="left-panel">
            <AufgabenAuswahl
              aufgaben={aufgaben}
              selectedVariante={selectedVariante}
              onSelectVariante={setSelectedVariante}
            />

            {selectedVariante && (
              <TextEditor
                value={userText}
                onChange={setUserText}
                disabled={loading}
              />
            )}

            {selectedVariante && userText && (
              <div className="submit-section">
                <div className="ai-service-selector">
                  <label>
                    <input
                      type="radio"
                      value="openai"
                      checked={aiService === 'openai'}
                      onChange={(e) => setAiService(e.target.value)}
                    />
                    ChatGPT-4o mini
                  </label>
                  <label>
                    <input
                      type="radio"
                      value="anthropic"
                      checked={aiService === 'anthropic'}
                      onChange={(e) => setAiService(e.target.value)}
                    />
                    Claude 3 Haiku
                  </label>
                </div>

                <div className="action-buttons">
                  <button
                    onClick={handleSubmit}
                    disabled={loading}
                    className="submit-btn"
                  >
                    {loading ? 'Bewerte...' : 'Text bewerten'}
                  </button>
                  <button
                    onClick={resetForm}
                    className="reset-btn"
                    disabled={loading}
                  >
                    Neu beginnen
                  </button>
                </div>
              </div>
            )}
          </div>

          <div className="right-panel">
            {loading && <LoadingSpinner />}
            {bewertung && <BewertungsAnzeige bewertung={bewertung} />}
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;