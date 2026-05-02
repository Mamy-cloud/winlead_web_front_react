import './Calls.css';

const CALLS = [
  { initials: 'ML', name: 'Marie Lambert',  time: '14:32', snippet: '"Devis toiture, urgence dégât eau"',       dur: '3:12', badge: 'ia',     label: 'IA',      hasAudio: true  },
  { initials: 'PD', name: 'Pierre Dubois',  time: '13:15', snippet: 'Pas de message',                           dur: '—',    badge: 'missed', label: 'Manqué',  hasAudio: false },
  { initials: 'SB', name: 'Sophie Bernard', time: '11:48', snippet: '"Rendez-vous plomberie salle de bain"',    dur: '1:45', badge: 'human',  label: 'Humain',  hasAudio: true  },
  { initials: 'TM', name: 'Thomas Martin',  time: '10:03', snippet: '"Fuite chauffe-eau, intervention rapide"', dur: '4:28', badge: 'ia',     label: 'IA',      hasAudio: true  },
  { initials: 'CM', name: 'Claire Morin',   time: '09:21', snippet: '"Installation climatisation"',             dur: '2:55', badge: 'ia',     label: 'IA',      hasAudio: true  },
  { initials: 'RV', name: 'René Vidal',     time: '08:50', snippet: '"Remplacement chaudière gaz"',             dur: '3:40', badge: 'human',  label: 'Humain',  hasAudio: true  },
];

function PlayIcon() {
  return (
    <svg width="10" height="10" viewBox="0 0 10 10" fill="currentColor">
      <path d="M2 1l7 4-7 4z"/>
    </svg>
  );
}

export default function Calls() {
  return (
    <div>
      <div className="grid-3">
        <div className="metric-card"><div className="metric-label">Total aujourd'hui</div><div className="metric-value">24</div></div>
        <div className="metric-card"><div className="metric-label">Manqués</div><div className="metric-value metric-bad">3</div></div>
        <div className="metric-card"><div className="metric-label">Traités par IA</div><div className="metric-value metric-good">17</div></div>
      </div>

      <div className="card">
        <div className="card-header">
          <span className="card-title">Historique des appels</span>
          <div className="calls__filters">
            <select className="form-input form-select" style={{ width: 130, fontSize: 12, padding: '5px 28px 5px 8px' }}>
              <option>Aujourd'hui</option>
              <option>Cette semaine</option>
              <option>Ce mois</option>
            </select>
          </div>
        </div>

        {CALLS.map(c => (
          <div className="calls__row" key={c.name}>
            <div className="avatar">{c.initials}</div>
            <div className="calls__info">
              <div className="calls__name">{c.name}</div>
              <div className="calls__snippet">{c.time} — {c.snippet}</div>
            </div>
            <span className="calls__dur">{c.dur}</span>
            <span className={`badge badge-${c.badge}`} style={{ marginRight: 8 }}>{c.label}</span>
            <button className="calls__play" disabled={!c.hasAudio} title={c.hasAudio ? 'Écouter l\'enregistrement' : 'Pas d\'enregistrement'}>
              <PlayIcon />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
