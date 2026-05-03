import { useState } from 'react';
import './Status.css';

export default function Status() {
  const [currentStatus, setCurrentStatus] = useState('available');

  const OPTIONS = [
    { id: 'available', emoji: '🟢', label: 'Je suis disponible',   sub: 'Je réponds aux appels',           cls: 'available' },
    { id: 'busy',      emoji: '🟡', label: 'Je suis occupé',        sub: "L'IA prend les appels à ma place", cls: 'busy'      },
    { id: 'offline',   emoji: '🔴', label: 'Je suis hors ligne',    sub: "L'IA gère tout",                  cls: 'offline'   },
  ];

  return (
    <div>
      <div className="card">
        <div className="card-header"><span className="card-title">🟢 Mon statut en ce moment</span></div>
        <p className="status__intro">Dis à l'IA si tu es disponible pour répondre aux appels.</p>
        <div className="status__options">
          {OPTIONS.map(o => (
            <button
              key={o.id}
              className={'status__option status__option--' + o.cls + (currentStatus === o.id ? ' status__option--selected' : '')}
              onClick={() => setCurrentStatus(o.id)}
            >
              <span className="status__option-emoji">{o.emoji}</span>
              <div>
                <div className="status__option-label">{o.label}</div>
                <div className="status__option-sub">{o.sub}</div>
              </div>
              {currentStatus === o.id && <span className="status__check">✓</span>}
            </button>
          ))}
        </div>
      </div>

      <div className="card">
        <div className="card-header"><span className="card-title">⚙️ Réglages automatiques</span></div>
        <div className="toggle-row">
          <div>
            <div className="toggle-label">📵 L'IA répond si je ne décroche pas</div>
            <div className="toggle-sub">Après 4 secondes sans réponse, l'IA prend le relais</div>
          </div>
          <label className="switch">
            <input type="checkbox" defaultChecked />
            <span className="switch-slider" />
          </label>
        </div>
        <div className="toggle-row">
          <div>
            <div className="toggle-label">📩 Me prévenir par SMS si appel manqué</div>
            <div className="toggle-sub">Tu reçois un SMS avec le nom et le numéro</div>
          </div>
          <label className="switch">
            <input type="checkbox" defaultChecked />
            <span className="switch-slider" />
          </label>
        </div>
      </div>
    </div>
  );
}
