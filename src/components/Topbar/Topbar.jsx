import { useState } from 'react';
import './Topbar.css';

const PAGE_TITLES = {
  dashboard: 'Dashboard',
  calls:     'Appels',
  status:    'Statut artisan',
  stats:     'Statistiques',
  ia:        'IA & Prompt',
  clients:   'Clients',
  config:    'Configuration',
  logs:      'Logs & monitoring',
  auth:      'Authentification',
};

export default function Topbar({ activePage, onLogout }) {
  const [iaActive, setIaActive] = useState(true);

  return (
    <header className="topbar">
      <h1 className="topbar__title">{PAGE_TITLES[activePage] ?? activePage}</h1>

      <div className="topbar__right">
        <button
          className={`topbar__ia-toggle topbar__ia-toggle--${iaActive ? 'on' : 'off'}`}
          onClick={() => setIaActive(v => !v)}
        >
          <span className={`topbar__ia-dot topbar__ia-dot--${iaActive ? 'on' : 'off'}`} />
          {iaActive ? 'IA active' : 'IA désactivée'}
        </button>

        <button className="topbar__help-btn">
          <svg width="12" height="12" viewBox="0 0 16 16" fill="currentColor">
            <path d="M8 1a7 7 0 100 14A7 7 0 008 1zm-.75 3.5h1.5v4.5h-1.5zm0 5.5h1.5v1.5h-1.5z"/>
          </svg>
          Aide
        </button>

        <button className="topbar__help-btn" onClick={onLogout} title="Se déconnecter">
          <svg width="12" height="12" viewBox="0 0 16 16" fill="currentColor">
            <path d="M6 2H3a1 1 0 00-1 1v10a1 1 0 001 1h3M10 11l3-3-3-3M13 8H6" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
          </svg>
          Déconnexion
        </button>
      </div>
    </header>
  );
}
