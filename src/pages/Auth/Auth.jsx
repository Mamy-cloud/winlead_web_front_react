import { useState } from 'react';
import './Auth.css';

const SECURITY = [
  { id: '2fa',       label: 'Double authentification', sub: 'SMS ou application TOTP',                       defaultOn: true  },
  { id: 'alerts',    label: 'Alertes connexion',        sub: 'Email si connexion depuis nouvel appareil',      defaultOn: true  },
  { id: 'auto-lock', label: 'Session auto-expiration',  sub: 'Déconnexion après 8h d\'inactivité',             defaultOn: false },
];

export default function Auth() {
  const [toggles, setToggles] = useState(() =>
    Object.fromEntries(SECURITY.map(s => [s.id, s.defaultOn]))
  );

  const flip = id => setToggles(t => ({ ...t, [id]: !t[id] }));

  return (
    <div>
      <div className="grid-2">
        {/* Compte */}
        <div className="card">
          <div className="card-header"><span className="card-title">Compte utilisateur</span></div>
          <div className="auth__profile-header">
            <div className="auth__avatar-lg">JD</div>
            <div>
              <div className="auth__profile-name">Jean Dupont</div>
              <div className="auth__profile-email">jean.dupont@email.fr</div>
              <span className="badge badge-admin">Admin</span>
            </div>
          </div>
          <div className="form-row">
            <label className="form-label">Email</label>
            <input className="form-input" defaultValue="jean.dupont@email.fr" />
          </div>
          <div className="form-row">
            <label className="form-label">Nouveau mot de passe</label>
            <input className="form-input" type="password" placeholder="••••••••" />
          </div>
          <div className="form-row">
            <label className="form-label">Confirmer le mot de passe</label>
            <input className="form-input" type="password" placeholder="••••••••" />
          </div>
          <button className="btn-primary">Mettre à jour</button>
        </div>

        {/* Sécurité */}
        <div className="card">
          <div className="card-header"><span className="card-title">Sécurité</span></div>
          {SECURITY.map(s => (
            <div className="toggle-row" key={s.id}>
              <div>
                <div className="toggle-label">{s.label}</div>
                <div className="toggle-sub">{s.sub}</div>
              </div>
              <label className="switch">
                <input type="checkbox" checked={toggles[s.id]} onChange={() => flip(s.id)} />
                <span className="switch-slider" />
              </label>
            </div>
          ))}
          <div className="auth__last-login">
            Dernière connexion : Aujourd'hui 09:14 — Paris, France
          </div>
        </div>
      </div>
    </div>
  );
}
