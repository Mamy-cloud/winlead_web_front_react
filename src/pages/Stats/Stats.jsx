import './Stats.css';

const TOP_MOTIFS = [
  { label: 'Devis / estimation',    pct: 38, color: 'var(--accent)' },
  { label: 'Urgence / dépannage',   pct: 29, color: '#378ADD' },
  { label: 'Prise de rendez-vous',  pct: 22, color: '#EF9F27' },
  { label: 'Renseignements',        pct: 11, color: '#888780' },
];

export default function Stats() {
  return (
    <div>
      <div className="grid-4">
        {[
          { label: 'Appels ce mois',  value: '312',  sub: '+18%',  cls: 'metric-good' },
          { label: 'Taux réponse',    value: '87%',  sub: '+3pts', cls: 'metric-good' },
          { label: 'Taux IA',         value: '71%',  sub: 'vs humain', cls: 'metric-good' },
          { label: 'Appels perdus',   value: '41',   sub: '13%',  cls: 'metric-bad' },
        ].map(m => (
          <div className="metric-card" key={m.label}>
            <div className="metric-label">{m.label}</div>
            <div className={`metric-value ${m.cls}`}>{m.value}</div>
            <div className={`metric-sub ${m.cls}`}>{m.sub}</div>
          </div>
        ))}
      </div>

      <div className="grid-2">
        {/* Donut */}
        <div className="card">
          <div className="card-header"><span className="card-title">Répartition IA vs humain</span></div>
          <div className="stats__donut-wrap">
            <svg className="stats__donut-svg" width="96" height="96" viewBox="0 0 96 96">
              <circle cx="48" cy="48" r="36" fill="none" stroke="var(--bg-secondary)" strokeWidth="12"/>
              <circle cx="48" cy="48" r="36" fill="none" stroke="var(--accent)" strokeWidth="12"
                strokeDasharray="160 65" strokeDashoffset="0"
                transform="rotate(-90 48 48)"/>
              <circle cx="48" cy="48" r="36" fill="none" stroke="#378ADD" strokeWidth="12"
                strokeDasharray="65 160" strokeDashoffset="-160"
                transform="rotate(-90 48 48)"/>
              <text x="48" y="52" textAnchor="middle" fontSize="13" fontWeight="500" fill="currentColor">71%</text>
            </svg>
            <div className="stats__donut-stats">
              <div className="stats__donut-item">
                <div className="stats__donut-pct" style={{ color: 'var(--accent)' }}>71%</div>
                <div className="stats__donut-lbl">Traités par IA (221 appels)</div>
              </div>
              <div className="stats__donut-item">
                <div className="stats__donut-pct" style={{ color: '#378ADD' }}>29%</div>
                <div className="stats__donut-lbl">Traités humain (91 appels)</div>
              </div>
            </div>
          </div>
        </div>

        {/* Top motifs */}
        <div className="card">
          <div className="card-header"><span className="card-title">Top motifs d'appel</span></div>
          {TOP_MOTIFS.map(({ label, pct, color }) => (
            <div className="progress-row" key={label}>
              <div className="progress-meta">
                <span>{label}</span>
                <span>{pct}%</span>
              </div>
              <div className="progress-bar">
                <div className="progress-fill" style={{ width: `${pct}%`, background: color }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
