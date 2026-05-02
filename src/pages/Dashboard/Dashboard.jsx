import './Dashboard.css';

const BARS = [
  { day: 'Lun', ia: 55, human: 35 },
  { day: 'Mar', ia: 70, human: 20 },
  { day: 'Mer', ia: 60, human: 30 },
  { day: 'Jeu', ia: 80, human: 15 },
  { day: 'Ven', ia: 65, human: 25 },
  { day: 'Sam', ia: 40, human: 40 },
  { day: 'Auj', ia: 71, human: 29 },
];

const RECENT_CALLS = [
  { initials: 'ML', name: 'Marie Lambert',  time: 'Aujourd\'hui 14:32 · +33 6 12 34 56 78', dur: '3:12', badge: 'ia',     badgeLabel: 'IA' },
  { initials: 'PD', name: 'Pierre Dubois',  time: 'Aujourd\'hui 13:15 · +33 7 98 76 54 32', dur: '—',    badge: 'missed', badgeLabel: 'Manqué' },
  { initials: 'SB', name: 'Sophie Bernard', time: 'Aujourd\'hui 11:48 · +33 6 55 44 33 22', dur: '1:45', badge: 'human',  badgeLabel: 'Humain' },
];

const PERF = [
  { label: 'Taux de résolution',   pct: 84, color: 'var(--accent)' },
  { label: 'Satisfaction client',  pct: 91, color: '#378ADD' },
  { label: 'Appels escaladés',     pct: 16, color: '#EF9F27' },
  { label: 'Latence moy. IA',      pct: 32, color: 'var(--accent)', display: '320ms' },
];

export default function Dashboard({ onNavigate }) {
  return (
    <div>
      {/* Metrics */}
      <div className="grid-4">
        {[
          { label: 'Appels aujourd\'hui', value: '24', sub: '+4 vs hier',   cls: 'metric-good' },
          { label: 'Traités par IA',      value: '17', sub: '70.8% du total', cls: 'metric-good' },
          { label: 'Appels manqués',      value: '3',  sub: 'À rappeler',   cls: 'metric-bad' },
          { label: 'Durée moy.',          value: '2:34', sub: '-18s vs hier', cls: 'metric-good' },
        ].map(m => (
          <div className="metric-card" key={m.label}>
            <div className="metric-label">{m.label}</div>
            <div className={`metric-value ${m.cls}`}>{m.value}</div>
            <div className={`metric-sub ${m.cls}`}>{m.sub}</div>
          </div>
        ))}
      </div>

      <div className="grid-2">
        {/* Bar chart */}
        <div className="card">
          <div className="card-header">
            <span className="card-title">Appels (7 derniers jours)</span>
            <div className="dashboard__legend">
              <div className="dashboard__legend-item">
                <div className="dashboard__legend-dot" style={{ background: 'var(--accent)' }} />IA
              </div>
              <div className="dashboard__legend-item">
                <div className="dashboard__legend-dot" style={{ background: '#378ADD' }} />Humain
              </div>
            </div>
          </div>
          <div className="dashboard__chart-wrap">
            {BARS.map(({ day, ia, human }) => (
              <div className="dashboard__bar-group" key={day}>
                <div className="dashboard__bar-stack">
                  <div className="dashboard__bar dashboard__bar--ia"    style={{ height: `${ia}%` }} />
                  <div className="dashboard__bar dashboard__bar--human" style={{ height: `${human}%` }} />
                </div>
                <div className="dashboard__bar-label">{day}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Performance */}
        <div className="card">
          <div className="card-header">
            <span className="card-title">Performance IA</span>
          </div>
          {PERF.map(({ label, pct, color, display }) => (
            <div className="progress-row" key={label}>
              <div className="progress-meta">
                <span>{label}</span>
                <span>{display ?? `${pct}%`}</span>
              </div>
              <div className="progress-bar">
                <div className="progress-fill" style={{ width: `${pct}%`, background: color }} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent calls */}
      <div className="card">
        <div className="card-header">
          <span className="card-title">Derniers appels</span>
          <button className="dashboard__card-link" onClick={() => onNavigate('calls')}>
            Voir tout
          </button>
        </div>
        {RECENT_CALLS.map(c => (
          <div className="dashboard__call-row" key={c.name}>
            <div className="avatar">{c.initials}</div>
            <div className="dashboard__call-info">
              <div className="dashboard__call-name">{c.name}</div>
              <div className="dashboard__call-time">{c.time}</div>
            </div>
            <span className="dashboard__call-dur">{c.dur}</span>
            <span className={`badge badge-${c.badge}`}>{c.badgeLabel}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
