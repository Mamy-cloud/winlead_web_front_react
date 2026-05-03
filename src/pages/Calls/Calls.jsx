import './Calls.css';

const CALLS = [
  { initials: 'PD', name: 'Pierre Dubois',  phone: '+33 7 98 76 54 32', time: '13:15', motif: 'Pas de message',                    dur: '—',    badge: 'missed', label: 'Manqué',  hasAudio: false, avatarBg: '#FCEBEB', avatarColor: '#A32D2D' },
  { initials: 'LR', name: 'Lucie Renard',   phone: '+33 6 44 55 66 77', time: '10:42', motif: 'Pas de message',                    dur: '—',    badge: 'missed', label: 'Manqué',  hasAudio: false, avatarBg: '#FCEBEB', avatarColor: '#A32D2D' },
  { initials: 'ML', name: 'Marie Lambert',  phone: '+33 6 12 34 56 78', time: '14:32', motif: '"Devis toiture, urgence dégât eau"', dur: '3:12', badge: 'ia',     label: 'IA',      hasAudio: true,  avatarBg: '', avatarColor: '' },
  { initials: 'TM', name: 'Thomas Martin',  phone: '+33 6 55 44 33 22', time: '10:03', motif: '"Fuite chauffe-eau"',               dur: '4:28', badge: 'ia',     label: 'IA',      hasAudio: true,  avatarBg: '', avatarColor: '' },
  { initials: 'SB', name: 'Sophie Bernard', phone: '+33 6 55 44 33 22', time: '08:50', motif: '"Rendez-vous plomberie"',           dur: '1:45', badge: 'human',  label: 'Moi',     hasAudio: true,  avatarBg: '', avatarColor: '' },
  { initials: '?',  name: 'Inconnu',         phone: '+33 6 00 11 22 33', time: '09:08', motif: 'Pas de message',                    dur: '—',    badge: 'missed', label: 'Manqué',  hasAudio: false, avatarBg: '#F0EFEC', avatarColor: '#6b6b67' },
];

export default function Calls() {
  const missed = CALLS.filter(c => c.badge === 'missed');
  const others = CALLS.filter(c => c.badge !== 'missed');

  return (
    <div>
      {/* Appels manqués en priorité */}
      {missed.length > 0 && (
        <div className="card" style={{ borderColor: 'rgba(163,45,45,0.3)', background: '#FFFAFA' }}>
          <div className="card-header">
            <span className="card-title">📵 Appels manqués — À rappeler ({missed.length})</span>
          </div>
          {missed.map(c => (
            <div className="calls__row" key={c.phone + c.time}>
              <div className="avatar" style={{ background: c.avatarBg || 'var(--bg-secondary)', color: c.avatarColor || 'var(--text-secondary)' }}>{c.initials}</div>
              <div className="calls__info">
                <div className="calls__name">{c.name}</div>
                <div className="calls__meta">{c.phone} · {c.time}</div>
              </div>
              <a href={'tel:' + c.phone.replace(/\s/g, '')} className="calls__callback-btn">
                📞 Rappeler
              </a>
            </div>
          ))}
        </div>
      )}

      {/* Historique */}
      <div className="card">
        <div className="card-header">
          <span className="card-title">📋 Historique des appels</span>
          <select className="form-input form-select" style={{ width: 140, fontSize: 13, padding: '6px 28px 6px 10px' }}>
            <option>Aujourd'hui</option>
            <option>Cette semaine</option>
            <option>Ce mois</option>
          </select>
        </div>
        {others.map(c => (
          <div className="calls__row" key={c.name}>
            <div className="avatar">{c.initials}</div>
            <div className="calls__info">
              <div className="calls__name">{c.name}</div>
              <div className="calls__meta">{c.time} · {c.motif}</div>
            </div>
            <span className="calls__dur">{c.dur}</span>
            <span className={'badge badge-' + c.badge} style={{ marginRight: 8 }}>{c.label}</span>
            <button className="calls__play" disabled={!c.hasAudio} title={c.hasAudio ? 'Écouter' : 'Pas d\'enregistrement'}>
              {c.hasAudio ? '▶' : '—'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
