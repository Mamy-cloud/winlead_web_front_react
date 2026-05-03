import './Sidebar.css';

const NAV_ITEMS = [
  {
    section: 'Mon activité',
    items: [
      { id: 'dashboard', label: 'Accueil',         emoji: '🏠', badge: null },
      { id: 'calls',     label: 'Mes appels',       emoji: '📞', badge: 3    },
      { id: 'clients',   label: 'Mes clients',      emoji: '👤', badge: null },
    ],
  },
  {
    section: 'Mon assistant IA',
    items: [
      { id: 'status',    label: 'Je suis disponible ?', emoji: '🟢', badge: null },
      { id: 'ia',        label: 'Mon assistant',         emoji: '🤖', badge: null },
    ],
  },
  {
    section: 'Mon compte',
    items: [
      { id: 'payment',   label: 'Abonnement',       emoji: '💳', badge: null },
      { id: 'auth',      label: 'Mon profil',        emoji: '👤', badge: null },
    ],
  },
];

export default function Sidebar({ activePage, onNavigate }) {
  return (
    <aside className="sidebar">
      <div className="sidebar__logo">
        <div className="sidebar__logo-icon">
          <svg width="20" height="20" viewBox="0 0 16 16" fill="white">
            <path d="M8 1a7 7 0 100 14A7 7 0 008 1zm0 2a5 5 0 110 10A5 5 0 018 3zm-.5 2v4.5l3.5 2-.5.866L6.5 10V5h1z" fillRule="evenodd"/>
          </svg>
        </div>
        <div>
          <div className="sidebar__logo-name">Winlead</div>
          <div className="sidebar__logo-sub">Assistant IA</div>
        </div>
      </div>

      <nav className="sidebar__nav">
        {NAV_ITEMS.map(({ section, items }) => (
          <div className="sidebar__nav-section" key={section}>
            <div className="sidebar__nav-label">{section}</div>
            {items.map(({ id, label, emoji, badge }) => (
              <button
                key={id}
                className={'sidebar__nav-item' + (activePage === id ? ' sidebar__nav-item--active' : '')}
                onClick={() => onNavigate(id)}
              >
                <span className="sidebar__nav-emoji">{emoji}</span>
                <span className="sidebar__nav-text">{label}</span>
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
            <div className="sidebar__user-role">Plombier · Lyon</div>
          </div>
          <div className="status-dot online" style={{ marginLeft: 'auto' }} />
        </div>
      </div>
    </aside>
  );
}
