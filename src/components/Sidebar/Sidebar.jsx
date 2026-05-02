import './Sidebar.css';

const NAV_ITEMS = [
  {
    section: 'Principal',
    items: [
      { id: 'dashboard', label: 'Dashboard',       badge: null },
      { id: 'calls',     label: 'Appels',           badge: 3    },
      { id: 'status',    label: 'Statut artisan',   badge: null },
      { id: 'stats',     label: 'Statistiques',     badge: null },
    ],
  },
  {
    section: 'IA & Config',
    items: [
      { id: 'ia',      label: 'IA & Prompt',   badge: null },
      { id: 'clients', label: 'Clients',        badge: null },
      { id: 'config',  label: 'Configuration',  badge: null },
      { id: 'payment', label: 'Paiement',       badge: null },
    ],
  },
  {
    section: 'Système',
    items: [
      { id: 'logs', label: 'Logs & monitoring', badge: null },
      { id: 'auth', label: 'Authentification',  badge: null },
    ],
  },
];

const ICONS = {
  dashboard: (
    <svg viewBox="0 0 16 16" fill="currentColor">
      <rect x="1" y="1" width="6" height="6" rx="1"/>
      <rect x="9" y="1" width="6" height="6" rx="1"/>
      <rect x="1" y="9" width="6" height="6" rx="1"/>
      <rect x="9" y="9" width="6" height="6" rx="1"/>
    </svg>
  ),
  calls: (
    <svg viewBox="0 0 16 16" fill="currentColor">
      <path d="M3 1h3l1.5 4L6 6.5c.9 1.8 2.7 3.6 4.5 4.5L12 9.5l4 1.5v3a1 1 0 01-1 1C5.5 15 1 10.5 1 4a1 1 0 011-3z"/>
    </svg>
  ),
  status: (
    <svg viewBox="0 0 16 16" fill="currentColor">
      <circle cx="8" cy="8" r="7"/>
      <circle cx="8" cy="6" r="2"/>
      <path d="M4 13c0-2.2 1.8-4 4-4s4 1.8 4 4"/>
    </svg>
  ),
  stats: (
    <svg viewBox="0 0 16 16" fill="currentColor">
      <rect x="1" y="8" width="3" height="7"/>
      <rect x="6" y="4" width="3" height="11"/>
      <rect x="11" y="1" width="3" height="14"/>
    </svg>
  ),
  ia: (
    <svg viewBox="0 0 16 16" fill="currentColor">
      <path d="M8 1a3 3 0 013 3v1h1a2 2 0 012 2v5a2 2 0 01-2 2H4a2 2 0 01-2-2V7a2 2 0 012-2h1V4a3 3 0 013-3zm0 2a1 1 0 00-1 1v1h2V4a1 1 0 00-1-1z"/>
    </svg>
  ),
  clients: (
    <svg viewBox="0 0 16 16" fill="currentColor">
      <path d="M6 8a3 3 0 100-6 3 3 0 000 6zm5 1H3a3 3 0 00-3 3v1h14v-1a3 3 0 00-3-3z"/>
    </svg>
  ),
  config: (
    <svg viewBox="0 0 16 16" fill="currentColor">
      <path d="M8 5a3 3 0 100 6 3 3 0 000-6zm-6.5 1.5l1.2-.4a5 5 0 00.5 1.2l-.8 1 1.3 1.3 1-.8a5 5 0 001.2.5l.4 1.2h1.8l.4-1.2a5 5 0 001.2-.5l1 .8 1.3-1.3-.8-1a5 5 0 00.5-1.2l1.2-.4V6.5l-1.2-.4a5 5 0 00-.5-1.2l.8-1L11.7 2.6l-1 .8a5 5 0 00-1.2-.5L9.1 1.6H7.3l-.4 1.3a5 5 0 00-1.2.5l-1-.8L3.4 3.9l.8 1a5 5 0 00-.5 1.2l-1.2.4z"/>
    </svg>
  ),
  payment: (
    <svg viewBox="0 0 16 16" fill="currentColor">
      <rect x="1" y="3" width="14" height="10" rx="2"/>
      <path d="M1 6h14" stroke="white" strokeWidth="1.5"/>
      <rect x="3" y="9" width="3" height="1.5" rx="0.5" fill="white"/>
    </svg>
  ),
  logs: (
    <svg viewBox="0 0 16 16" fill="currentColor">
      <rect x="1" y="1" width="14" height="3" rx="1"/>
      <rect x="1" y="6" width="10" height="2" rx="1"/>
      <rect x="1" y="10" width="12" height="2" rx="1"/>
      <rect x="1" y="14" width="7" height="2" rx="1"/>
    </svg>
  ),
  auth: (
    <svg viewBox="0 0 16 16" fill="currentColor">
      <rect x="3" y="7" width="10" height="8" rx="1"/>
      <path d="M5 7V5a3 3 0 016 0v2" stroke="currentColor" strokeWidth="1.5" fill="none"/>
      <circle cx="8" cy="11" r="1.5"/>
    </svg>
  ),
};

export default function Sidebar({ activePage, onNavigate }) {
  return (
    <aside className="sidebar">
      <div className="sidebar__logo">
        <div className="sidebar__logo-badge">
          <div className="sidebar__logo-icon">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="white">
              <path d="M8 1a7 7 0 100 14A7 7 0 008 1zm0 2a5 5 0 110 10A5 5 0 018 3zm-.5 2v4.5l3.5 2-.5.866L6.5 10V5h1z" fillRule="evenodd"/>
            </svg>
          </div>
          <div>
            <div className="sidebar__logo-name">Winlead</div>
            <div className="sidebar__logo-sub">Tableau de bord</div>
          </div>
        </div>
      </div>

      <nav className="sidebar__nav">
        {NAV_ITEMS.map(({ section, items }) => (
          <div className="sidebar__nav-section" key={section}>
            <div className="sidebar__nav-label">{section}</div>
            {items.map(({ id, label, badge }) => (
              <button
                key={id}
                className={'sidebar__nav-item' + (activePage === id ? ' sidebar__nav-item--active' : '')}
                onClick={() => onNavigate(id)}
              >
                <span className="sidebar__nav-icon">{ICONS[id]}</span>
                {label}
                {badge && <span className="sidebar__nav-badge">{badge}</span>}
              </button>
            ))}
          </div>
        ))}
      </nav>

      <div className="sidebar__user">
        <div className="sidebar__user-card">
          <div className="sidebar__user-avatar">JD</div>
          <div>
            <div className="sidebar__user-name">Jean Dupont</div>
            <div className="sidebar__user-role">Administrateur</div>
          </div>
          <div className="status-dot online" style={{ marginLeft: 'auto' }} />
        </div>
      </div>
    </aside>
  );
}
