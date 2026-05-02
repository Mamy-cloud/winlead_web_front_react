import { useState } from 'react';
import './Status.css';

const DAYS = [
  { name: 'Lun', slots: ['on', 'on', 'partial'] },
  { name: 'Mar', slots: ['on', 'on', 'on'] },
  { name: 'Mer', slots: ['on', 'on', 'partial'] },
  { name: 'Jeu', slots: ['on', 'on', 'on'] },
  { name: 'Ven', slots: ['on', 'on', 'off'] },
  { name: 'Sam', slots: ['partial', 'off', 'off'] },
  { name: 'Dim', slots: ['off', 'off', 'off'] },
];

const REDIRECTS = [
  { id: 'ia-fallback', label: 'IA prend le relais si occupé',    sub: 'Bascule automatiquement sur l\'IA vocale', defaultOn: true },
  { id: 'voicemail',   label: 'Message de boîte vocale',         sub: 'Si IA indisponible, enregistrement vocal', defaultOn: false },
  { id: 'sms-notif',   label: 'Notification SMS appel manqué',   sub: 'Reçois un SMS pour chaque appel raté',     defaultOn: true },
];

export default function Status() {
  const [currentStatus, setCurrentStatus] = useState('available');
  const [toggles, setToggles] = useState(() =>
    Object.fromEntries(REDIRECTS.map(r => [r.id, r.defaultOn]))
  );

  const flip = id => setToggles(t => ({ ...t, [id]: !t[id] }));

  return (
    <div>
      <div className="card">
        <div className="card-header"><span className="card-title">Mon statut actuel</span></div>

        <div className="status__selector">
          {['available', 'busy', 'offline'].map(s => (
            <button
              key={s}
              className={`status__btn${currentStatus === s ? ` status__btn--${s}` : ''}`}
              onClick={() => setCurrentStatus(s)}
            >
              {{ available: 'Disponible', busy: 'Occupé', offline: 'Hors ligne' }[s]}
            </button>
          ))}
        </div>

        <div className="section-title">Horaires de travail</div>

        <div className="status__schedule">
          {DAYS.map(({ name, slots }) => (
            <div className="status__day-col" key={name}>
              <div className="status__day-name">{name}</div>
              {slots.map((s, i) => (
                <div key={i} className={`status__slot status__slot--${s}`} />
              ))}
            </div>
          ))}
        </div>

        <div className="status__legend">
          <div className="status__legend-item">
            <div className="status__legend-dot" style={{ background: 'var(--accent)' }} />Ouvert
          </div>
          <div className="status__legend-item">
            <div className="status__legend-dot" style={{ background: 'var(--accent-mid)' }} />Partiel
          </div>
          <div className="status__legend-item">
            <div className="status__legend-dot" style={{ background: 'var(--bg-secondary)', border: '0.5px solid var(--border-light)' }} />Fermé
          </div>
        </div>
      </div>

      <div className="card">
        <div className="card-header"><span className="card-title">Règles de redirection</span></div>
        {REDIRECTS.map(r => (
          <div className="toggle-row" key={r.id}>
            <div>
              <div className="toggle-label">{r.label}</div>
              <div className="toggle-sub">{r.sub}</div>
            </div>
            <label className="switch">
              <input type="checkbox" checked={toggles[r.id]} onChange={() => flip(r.id)} />
              <span className="switch-slider" />
            </label>
          </div>
        ))}
      </div>
    </div>
  );
}
