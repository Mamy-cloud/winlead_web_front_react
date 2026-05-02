import { useState } from 'react';
import './Logs.css';

const LOGS = [
  { time: '14:35:02', type: 'ok',   msg: 'VAPI — Appel entrant +33612345678 — IA activée' },
  { time: '14:34:58', type: 'ok',   msg: 'Twilio — Webhook reçu /call/incoming — 200 OK' },
  { time: '14:30:11', type: 'warn', msg: 'Groq API — Timeout 5s — retry #1 réussi' },
  { time: '14:28:44', type: 'ok',   msg: 'STT — Transcription terminée — 98% confiance' },
  { time: '13:52:03', type: 'err',  msg: 'Twilio Auth — 401 Unauthorized — token expiré' },
  { time: '13:48:27', type: 'ok',   msg: 'VAPI — Session terminée — durée 3m 12s' },
  { time: '13:15:00', type: 'ok',   msg: 'Twilio — Appel manqué +33798765432 — SMS envoyé' },
  { time: '12:44:10', type: 'warn', msg: 'ElevenLabs TTS — latence 820ms (seuil : 600ms)' },
  { time: '12:30:05', type: 'ok',   msg: 'Hetzner webhook — Health check — 200 OK' },
];

const FILTERS = ['Tous', 'OK', 'Warnings', 'Erreurs'];

export default function Logs() {
  const [filter, setFilter] = useState('Tous');

  const filtered = LOGS.filter(l => {
    if (filter === 'Tous') return true;
    if (filter === 'OK') return l.type === 'ok';
    if (filter === 'Warnings') return l.type === 'warn';
    if (filter === 'Erreurs') return l.type === 'err';
    return true;
  });

  return (
    <div>
      <div className="grid-3">
        <div className="metric-card"><div className="metric-label">Requêtes 24h</div><div className="metric-value">1 204</div><div className="metric-sub metric-good">99.8% succès</div></div>
        <div className="metric-card"><div className="metric-label">Erreurs</div><div className="metric-value metric-bad">3</div><div className="metric-sub">2 timeout, 1 auth</div></div>
        <div className="metric-card"><div className="metric-label">Latence moy.</div><div className="metric-value">312ms</div><div className="metric-sub metric-good">stable</div></div>
      </div>

      <div className="card">
        <div className="card-header">
          <span className="card-title">Logs système</span>
          <div className="logs__filters">
            {FILTERS.map(f => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={filter === f ? 'btn-primary' : 'btn-secondary'}
                style={{ padding: '4px 12px', fontSize: 12 }}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        {filtered.map((l, i) => (
          <div className={`logs__row logs__row--${l.type}`} key={i}>
            <span className="logs__time">{l.time}</span>
            <div className="logs__dot" />
            <span className="logs__msg">{l.msg}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
