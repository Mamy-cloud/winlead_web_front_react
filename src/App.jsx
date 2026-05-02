import { useState } from 'react';
import './styles/global.css';

import Sidebar    from './components/Sidebar/Sidebar';
import Topbar     from './components/Topbar/Topbar';
import Dashboard  from './pages/Dashboard/Dashboard';
import Calls      from './pages/Calls/Calls';
import Status     from './pages/Status/Status';
import Stats      from './pages/Stats/Stats';
import IASettings from './pages/IASettings/IASettings';
import Clients    from './pages/Clients/Clients';
import Config     from './pages/Config/Config';
import Payment    from './pages/Payment/Payment';
import Logs       from './pages/Logs/Logs';
import Auth       from './pages/Auth/Auth';
import Login      from './pages/AuthPages/Login';
import Register   from './pages/AuthPages/Register';

const DASHBOARD_PAGES = {
  dashboard: Dashboard,
  calls:     Calls,
  status:    Status,
  stats:     Stats,
  ia:        IASettings,
  clients:   Clients,
  config:    Config,
  payment:   Payment,
  logs:      Logs,
  auth:      Auth,
};

export default function App() {
  const [authScreen, setAuthScreen] = useState('login');
  const [activePage, setActivePage] = useState('dashboard');

  if (authScreen === 'login') {
    return (
      <Login
        onNavigateToRegister={() => setAuthScreen('register')}
        onLoginSuccess={() => setAuthScreen(null)}
      />
    );
  }

  if (authScreen === 'register') {
    return (
      <Register
        onNavigateToLogin={() => setAuthScreen('login')}
        onRegisterSuccess={() => setAuthScreen(null)}
      />
    );
  }

  const PageComponent = DASHBOARD_PAGES[activePage] ?? Dashboard;

  return (
    <div className="app-layout">
      <Sidebar activePage={activePage} onNavigate={setActivePage} />
      <div className="app-main">
        <Topbar
          activePage={activePage}
          onLogout={() => setAuthScreen('login')}
        />
        <main className="page-content">
          <PageComponent onNavigate={setActivePage} />
        </main>
      </div>
    </div>
  );
}
