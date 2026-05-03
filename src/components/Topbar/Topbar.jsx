import { useState } from 'react';
import './Topbar.css';

const PAGE_TITLES = {
  dashboard: '🏠 Accueil',
  calls:     '📞 Mes appels',
  clients:   '👤 Mes clients',
  status:    '🟢 Ma disponibilité',
  ia:        '🤖 Mon assistant IA',
  payment:   '💳 Mon abonnement',
  auth:      '👤 Mon profil',
  stats:     '📈 Statistiques',
  config:    '⚙️ Configuration',
  logs:      '🔍 Logs système',
};

export default function Topbar({ activePage, onLogout }) {
  const [iaActive, setIaActive] = useState(true);

  return (
    <header className="topbar">
      <h1 className="topbar__title">{PAGE_TITLES[activePage] ?? activePage}</h1>
      <div className="topbar__right">
        <button
          className={'topbar__ia-toggle topbar__ia-toggle--' + (iaActive ? 'on' : 'off')}
          onClick={() => setIaActive(v => !v)}
          title={iaActive ? "Cliquer pour désactiver l'IA" : "Cliquer pour activer l'IA"}
        >
          <span className={'topbar__ia-dot topbar__ia-dot--' + (iaActive ? 'on' : 'off')} />
          {iaActive ? '✅ IA allumée' : '⛔ IA éteinte'}
        </button>
        <button className="topbar__logout-btn" onClick={onLogout}>
          Déconnexion
        </button>
      </div>
    </header>
  );
}
