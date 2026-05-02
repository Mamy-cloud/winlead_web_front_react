import { useState } from 'react';
import './AuthPages.css';

function LogoIcon() {
  return (
    <div className="auth-page__logo-icon">
      <svg width="18" height="18" viewBox="0 0 16 16" fill="white">
        <path d="M8 1a7 7 0 100 14A7 7 0 008 1zm0 2a5 5 0 110 10A5 5 0 018 3zm-.5 2v4.5l3.5 2-.5.866L6.5 10V5h1z" fillRule="evenodd"/>
      </svg>
    </div>
  );
}

function EyeIcon({ open }) {
  return open ? (
    <svg width="15" height="15" viewBox="0 0 16 16" fill="currentColor">
      <path d="M8 3C4.5 3 1.5 5.5 1 8c.5 2.5 3.5 5 7 5s6.5-2.5 7-5c-.5-2.5-3.5-5-7-5zm0 8a3 3 0 110-6 3 3 0 010 6zm0-4.5a1.5 1.5 0 100 3 1.5 1.5 0 000-3z"/>
    </svg>
  ) : (
    <svg width="15" height="15" viewBox="0 0 16 16" fill="currentColor">
      <path d="M1 1l14 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" fill="none"/>
      <path d="M6.5 6.6A3 3 0 0111.4 11M4.2 4.3C2.6 5.3 1.5 6.6 1 8c.5 2.5 3.5 5 7 5a7 7 0 003.8-1.2M6 3.1A7 7 0 0115 8c-.3 1.3-1 2.5-2 3.5" fill="none" stroke="currentColor" strokeWidth="1.2"/>
    </svg>
  );
}

export default function Login({ onNavigateToRegister, onLoginSuccess }) {
  const [email,    setEmail]    = useState('');
  const [password, setPassword] = useState('');
  const [showPwd,  setShowPwd]  = useState(false);
  const [remember, setRemember] = useState(false);

  const handleSubmit = e => {
    e.preventDefault();
    // Mode test — accès direct au dashboard sans vérification
    onLoginSuccess?.();
  };

  return (
    <div className="auth-page">
      <div className="auth-page__card">

        <div className="auth-page__logo">
          <LogoIcon />
          <div>
            <div className="auth-page__logo-name">Winlead</div>
            <div className="auth-page__logo-sub">Tableau de bord artisan</div>
          </div>
        </div>

        <h1 className="auth-page__heading">Connexion</h1>
        <p className="auth-page__subheading">
          Accède à ton tableau de bord et pilote ton IA vocale.
        </p>

        <form className="auth-page__form" onSubmit={handleSubmit} noValidate>
          <div className="auth-page__field">
            <label className="auth-page__label">Adresse email</label>
            <input
              className="auth-page__input"
              type="email"
              placeholder="jean@email.fr"
              value={email}
              onChange={e => setEmail(e.target.value)}
              autoComplete="email"
            />
          </div>

          <div className="auth-page__field">
            <label className="auth-page__label">Mot de passe</label>
            <div className="auth-page__input-wrap">
              <input
                className="auth-page__input"
                type={showPwd ? 'text' : 'password'}
                placeholder="••••••••"
                value={password}
                onChange={e => setPassword(e.target.value)}
                autoComplete="current-password"
              />
              <button
                type="button"
                className="auth-page__eye-btn"
                onClick={() => setShowPwd(v => !v)}
                tabIndex={-1}
              >
                <EyeIcon open={showPwd} />
              </button>
            </div>
          </div>

          <div className="auth-page__options">
            <label className="auth-page__remember">
              <input
                type="checkbox"
                checked={remember}
                onChange={e => setRemember(e.target.checked)}
              />
              Se souvenir de moi
            </label>
            <button type="button" className="auth-page__forgot">
              Mot de passe oublié ?
            </button>
          </div>

          <button type="submit" className="auth-page__submit">
            Se connecter
          </button>
        </form>

        <div className="auth-page__switch">
          Pas encore de compte ?{' '}
          <button className="auth-page__switch-btn" onClick={onNavigateToRegister}>
            Créer un compte
          </button>
        </div>

      </div>
    </div>
  );
}
