import { useState } from 'react';
import './IASettings.css';

const TRIGGERS = [
  { id: 'immediate', label: 'Immédiat',          sub: 'L\'IA répond dès la première sonnerie', defaultOn: false },
  { id: 'after30',   label: 'Après 30 secondes', sub: 'Fallback si pas de réponse humaine',    defaultOn: true  },
];

const DEFAULT_PROMPT = `Tu es l'assistant vocal de Jean Dupont, artisan plombier à Lyon. Tu réponds de manière professionnelle et chaleureuse.

Tes règles :
- Collecte le nom, numéro et motif de l'appel
- Propose des créneaux disponibles pour les rendez-vous
- Pour les urgences, note les informations et promets un rappel dans 30 min
- Ne donne jamais de prix sans avoir vu le chantier
- Redirige vers Jean si le client insiste`;

export default function IASettings() {
  const [toggles, setToggles] = useState(() =>
    Object.fromEntries(TRIGGERS.map(t => [t.id, t.defaultOn]))
  );
  const [prompt, setPrompt] = useState(DEFAULT_PROMPT);

  const flip = id => setToggles(t => ({ ...t, [id]: !t[id] }));

  return (
    <div>
      <div className="grid-2">
        {/* Paramètres */}
        <div className="card">
          <div className="card-header"><span className="card-title">Paramètres IA vocale</span></div>

          <div className="form-row">
            <label className="form-label">Modèle LLM</label>
            <select className="form-input form-select">
              <option>Groq — Llama 3.3 70B</option>
              <option>OpenAI — GPT-4o</option>
              <option>Anthropic — Claude Sonnet 4</option>
            </select>
          </div>
          <div className="form-row">
            <label className="form-label">Voix TTS</label>
            <select className="form-input form-select">
              <option>ElevenLabs — Emma (FR)</option>
              <option>ElevenLabs — Nicolas (FR)</option>
              <option>VAPI — Sophia</option>
            </select>
          </div>
          <div className="form-row">
            <label className="form-label">Langue</label>
            <select className="form-input form-select">
              <option>Français</option>
              <option>English</option>
              <option>Español</option>
            </select>
          </div>

          <div className="card-header" style={{ marginTop: 8 }}>
            <span className="card-title">Mode d'intervention</span>
          </div>
          {TRIGGERS.map(t => (
            <div className="toggle-row" key={t.id}>
              <div>
                <div className="toggle-label">{t.label}</div>
                <div className="toggle-sub">{t.sub}</div>
              </div>
              <label className="switch">
                <input type="checkbox" checked={toggles[t.id]} onChange={() => flip(t.id)} />
                <span className="switch-slider" />
              </label>
            </div>
          ))}
        </div>

        {/* Prompt */}
        <div className="card">
          <div className="card-header"><span className="card-title">Prompt système</span></div>
          <div className="form-row">
            <label className="form-label">Comportement de l'assistant</label>
            <textarea
              className="form-input form-textarea"
              style={{ minHeight: 200 }}
              value={prompt}
              onChange={e => setPrompt(e.target.value)}
            />
          </div>
          <div className="ia__prompt-actions">
            <button className="btn-primary">Enregistrer</button>
            <button className="btn-secondary">Tester l'IA</button>
          </div>
        </div>
      </div>
    </div>
  );
}
