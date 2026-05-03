import './Dashboard.css';

const MISSED_CALLS = [
  { initials: 'PD', name: 'Pierre Dubois',  time: 'Aujourd\'hui 13:15', phone: '+33 7 98 76 54 32', color: '#FCEBEB', colorText: '#A32D2D' },
  { initials: 'LR', name: 'Lucie Renard',   time: 'Aujourd\'hui 10:42', phone: '+33 6 44 55 66 77', color: '#FCEBEB', colorText: '#A32D2D' },
  { initials: '?',  name: 'Inconnu',         time: 'Aujourd\'hui 09:08', phone: '+33 6 00 11 22 33', color: '#F0EFEC', colorText: '#6b6b67' },
];

const RECENT_CALLS = [
  { initials: 'ML', name: 'Marie Lambert',  time: '14:32', motif: 'Devis toiture',          dur: '3:12', badge: 'ia',    label: 'IA' },
  { initials: 'TM', name: 'Thomas Martin',  time: '10:03', motif: 'Fuite chauffe-eau',       dur: '4:28', badge: 'ia',    label: 'IA' },
  { initials: 'SB', name: 'Sophie Bernard', time: '08:50', motif: 'Rendez-vous plomberie',   dur: '1:45', badge: 'human', label: 'Moi' },
];

export default function Dashboard({ onNavigate }) {
  return (
    <div>
      {/* Alerte appels manqués */}
      <div className="dashboard__alert-missed">
        <span className="dashboard__alert-icon">📵</span>
        <div>
          <div className="dashboard__alert-title">3 appels manqués aujourd'hui</div>
          <div className="dashboard__alert-sub">Ces clients attendent que tu les rappelles</div>
        </div>
        <button className="btn-primary" onClick={() => onNavigate('calls')}>
          Voir les appels manqués
        </button>
      </div>

      {/* Chiffres du jour */}
      <div className="section-title">Aujourd'hui</div>
      <div className="grid-4" style={{ marginBottom: 24 }}>
        <div className="metric-card">
          <div className="metric-label">📞 Appels reçus</div>
          <div className="metric-value">24</div>
          <div className="metric-sub metric-good">+4 vs hier</div>
        </div>
        <div className="metric-card">
          <div className="metric-label">📵 Appels manqués</div>
          <div className="metric-value metric-bad">3</div>
          <div className="metric-sub metric-bad">À rappeler</div>
        </div>
        <div className="metric-card">
          <div className="metric-label">🤖 Gérés par l'IA</div>
          <div className="metric-value" style={{ color: 'var(--accent)' }}>17</div>
          <div className="metric-sub">sur 24 appels</div>
        </div>
        <div className="metric-card">
          <div className="metric-label">⏱ Durée moyenne</div>
          <div className="metric-value">2:34</div>
          <div className="metric-sub">par appel</div>
        </div>
      </div>

      <div className="grid-2">
        {/* Appels manqués */}
        <div className="card">
          <div className="card-header">
            <span className="card-title">📵 À rappeler</span>
            <button className="dashboard__link" onClick={() => onNavigate('calls')}>Voir tout</button>
          </div>
          {MISSED_CALLS.map(c => (
            <div className="dashboard__missed-row" key={c.phone}>
              <div className="avatar" style={{ background: c.color, color: c.colorText }}>{c.initials}</div>
              <div className="dashboard__missed-info">
                <div className="dashboard__missed-name">{c.name}</div>
                <div className="dashboard__missed-time">{c.time}</div>
              </div>
              <a href={'tel:' + c.phone.replace(/\s/g, '')} className="dashboard__call-back-btn">
                📞 Rappeler
              </a>
            </div>
          ))}
        </div>

        {/* Derniers appels */}
        <div className="card">
          <div className="card-header">
            <span className="card-title">📋 Derniers appels</span>
            <button className="dashboard__link" onClick={() => onNavigate('calls')}>Voir tout</button>
          </div>
          {RECENT_CALLS.map(c => (
            <div className="dashboard__call-row" key={c.name}>
              <div className="avatar">{c.initials}</div>
              <div className="dashboard__call-info">
                <div className="dashboard__call-name">{c.name}</div>
                <div className="dashboard__call-meta">{c.time} · {c.motif}</div>
              </div>
              <span className="dashboard__call-dur">{c.dur}</span>
              <span className={'badge badge-' + c.badge}>{c.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Actions rapides */}
      <div className="section-title">Actions rapides</div>
      <div className="grid-4">
        <button className="btn-action" onClick={() => onNavigate('calls')}>
          <span className="btn-action__icon">📞</span>
          <span className="btn-action__label">Mes appels</span>
          <span className="btn-action__sub">Voir l'historique</span>
        </button>
        <button className="btn-action" onClick={() => onNavigate('clients')}>
          <span className="btn-action__icon">👥</span>
          <span className="btn-action__label">Mes clients</span>
          <span className="btn-action__sub">Gérer les contacts</span>
        </button>
        <button className="btn-action" onClick={() => onNavigate('status')}>
          <span className="btn-action__icon">🟢</span>
          <span className="btn-action__label">Ma disponibilité</span>
          <span className="btn-action__sub">Je suis disponible</span>
        </button>
        <button className="btn-action" onClick={() => onNavigate('ia')}>
          <span className="btn-action__icon">🤖</span>
          <span className="btn-action__label">Mon assistant</span>
          <span className="btn-action__sub">Régler l'IA</span>
        </button>
      </div>
    </div>
  );
}
