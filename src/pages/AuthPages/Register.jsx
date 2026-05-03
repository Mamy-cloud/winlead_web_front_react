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

function getPasswordStrength(pwd) {
  if (!pwd) return null;
  let score = 0;
  if (pwd.length >= 8)          score++;
  if (/[A-Z]/.test(pwd))        score++;
  if (/[0-9]/.test(pwd))        score++;
  if (/[^A-Za-z0-9]/.test(pwd)) score++;
  if (score <= 1) return 'weak';
  if (score <= 2) return 'medium';
  return 'strong';
}

const STRENGTH_LABELS = { weak: 'Faible', medium: 'Moyen', strong: 'Fort' };

export default function Register({ onNavigateToLogin, onRegisterSuccess }) {
  const [form, setForm] = useState({
    nom: '', prenom: '', email: '', twilioNumber: '', password: '', confirm: '',
  });
  const [showPwd,     setShowPwd]     = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [error,       setError]       = useState('');
  const [fieldErrors, setFieldErrors] = useState({});

  const set = key => e => setForm(f => ({ ...f, [key]: e.target.value }));

  const validate = () => {
    const errs = {};
    if (!form.prenom.trim()) errs.prenom = 'Le prénom est requis';
    if (!form.nom.trim())    errs.nom    = 'Le nom est requis';
    if (!form.email.trim())  errs.email  = "L'email est requis";
    else if (!/\S+@\S+\.\S+/.test(form.email)) errs.email = 'Email invalide';
    if (!form.twilioNumber.trim()) {
      errs.twilioNumber = 'Le numéro Twilio est obligatoire';
    } else if (!/^\+[1-9]\d{7,14}$/.test(form.twilioNumber.replace(/\s/g, ''))) {
      errs.twilioNumber = 'Format invalide — ex : +33756001234';
    }
    if (!form.password) errs.password = 'Le mot de passe est requis';
    else if (form.password.length < 8) errs.password = '8 caractères minimum';
    if (form.password !== form.confirm) errs.confirm = 'Les mots de passe ne correspondent pas';
    return errs;
  };

  const handleSubmit = e => {
    e.preventDefault();
    setError('');
    const errs = validate();
    if (Object.keys(errs).length) { setFieldErrors(errs); return; }
    setFieldErrors({});
    // Mode test — accès direct au dashboard sans API
    onRegisterSuccess?.();
  };

  const strength = getPasswordStrength(form.password);

  return (
    <div className="auth-page">
      <div className="auth-page__card" style={{ maxWidth: 460 }}>

        <div className="auth-page__logo">
          <LogoIcon />
          <div>
            <div className="auth-page__logo-name">Winlead</div>
            <div className="auth-page__logo-sub">Tableau de bord artisan</div>
          </div>
        </div>

        <h1 className="auth-page__heading">Créer un compte</h1>
        <p className="auth-page__subheading">
          Configure ton assistant IA vocal en quelques secondes.
        </p>

        {error && (
          <div className="auth-page__alert auth-page__alert--error">
            <svg width="13" height="13" viewBox="0 0 16 16" fill="currentColor" style={{ flexShrink: 0, marginTop: 1 }}>
              <path d="M8 1a7 7 0 100 14A7 7 0 008 1zm-.75 3.5h1.5v4.5h-1.5zm0 5.5h1.5v1.5h-1.5z"/>
            </svg>
            {error}
          </div>
        )}

        <form className="auth-page__form" onSubmit={handleSubmit} noValidate>

          {/* Nom / Prénom */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            <div className="auth-page__field">
              <label className="auth-page__label">Prénom</label>
              <input
                className={'auth-page__input' + (fieldErrors.prenom ? ' auth-page__input--error' : '')}
                type="text"
                placeholder="Jean"
                value={form.prenom}
                onChange={set('prenom')}
                autoComplete="given-name"
              />
              {fieldErrors.prenom && <span className="auth-page__input-error-msg">{fieldErrors.prenom}</span>}
            </div>
            <div className="auth-page__field">
              <label className="auth-page__label">Nom</label>
              <input
                className={'auth-page__input' + (fieldErrors.nom ? ' auth-page__input--error' : '')}
                type="text"
                placeholder="Dupont"
                value={form.nom}
                onChange={set('nom')}
                autoComplete="family-name"
              />
              {fieldErrors.nom && <span className="auth-page__input-error-msg">{fieldErrors.nom}</span>}
            </div>
          </div>

          {/* Email */}
          <div className="auth-page__field">
            <label className="auth-page__label">Adresse email</label>
            <input
              className={'auth-page__input' + (fieldErrors.email ? ' auth-page__input--error' : '')}
              type="email"
              placeholder="jean@email.fr"
              value={form.email}
              onChange={set('email')}
              autoComplete="email"
            />
            {fieldErrors.email && <span className="auth-page__input-error-msg">{fieldErrors.email}</span>}
          </div>

          {/* Numéro Twilio — obligatoire */}
          <div className="auth-page__field">
            <label className="auth-page__label">
              Numéro Twilio
              <span className="auth-page__required-badge">Obligatoire</span>
            </label>
            <input
              className={'auth-page__input' + (fieldErrors.twilioNumber ? ' auth-page__input--error' : '')}
              type="tel"
              placeholder="+33756001234"
              value={form.twilioNumber}
              onChange={set('twilioNumber')}
              autoComplete="off"
            />
            {fieldErrors.twilioNumber
              ? <span className="auth-page__input-error-msg">{fieldErrors.twilioNumber}</span>
              : (
                <div className="auth-page__field-hint">
                  <svg width="11" height="11" viewBox="0 0 16 16" fill="currentColor" style={{ flexShrink: 0, marginTop: 1 }}>
                    <path d="M8 1a7 7 0 100 14A7 7 0 008 1zm-.75 3.5h1.5v4.5h-1.5zm0 5.5h1.5v1.5h-1.5z"/>
                  </svg>
                  Ce doit être un numéro acheté sur{' '}
                  <a href="https://www.twilio.com/login" target="_blank" rel="noreferrer">
                    console.twilio.com
                  </a>
                  {' '}au format international (+33…)
                </div>
              )
            }
          </div>

          <div className="auth-page__section-sep" />

          {/* Mot de passe */}
          <div className="auth-page__field">
            <label className="auth-page__label">Mot de passe</label>
            <div className="auth-page__input-wrap">
              <input
                className={'auth-page__input' + (fieldErrors.password ? ' auth-page__input--error' : '')}
                type={showPwd ? 'text' : 'password'}
                placeholder="••••••••"
                value={form.password}
                onChange={set('password')}
                autoComplete="new-password"
              />
              <button type="button" className="auth-page__eye-btn" onClick={() => setShowPwd(v => !v)} tabIndex={-1}>
                <EyeIcon open={showPwd} />
              </button>
            </div>
            {fieldErrors.password && <span className="auth-page__input-error-msg">{fieldErrors.password}</span>}
            {form.password && (
              <>
                <div className="auth-page__pwd-strength">
                  {['weak', 'medium', 'strong'].map((lvl, i) => {
                    const active = strength === 'weak' ? i === 0 : strength === 'medium' ? i <= 1 : true;
                    return (
                      <div key={lvl} className={'auth-page__pwd-bar' + (active ? ' auth-page__pwd-bar--' + strength : '')} />
                    );
                  })}
                </div>
                <div className={'auth-page__pwd-label auth-page__pwd-label--' + strength}>
                  Force : {STRENGTH_LABELS[strength]}
                </div>
              </>
            )}
          </div>

          {/* Confirmer */}
          <div className="auth-page__field">
            <label className="auth-page__label">Confirmer le mot de passe</label>
            <div className="auth-page__input-wrap">
              <input
                className={'auth-page__input' + (fieldErrors.confirm ? ' auth-page__input--error' : '')}
                type={showConfirm ? 'text' : 'password'}
                placeholder="••••••••"
                value={form.confirm}
                onChange={set('confirm')}
                autoComplete="new-password"
              />
              <button type="button" className="auth-page__eye-btn" onClick={() => setShowConfirm(v => !v)} tabIndex={-1}>
                <EyeIcon open={showConfirm} />
              </button>
            </div>
            {fieldErrors.confirm && <span className="auth-page__input-error-msg">{fieldErrors.confirm}</span>}
          </div>

          <button type="submit" className="auth-page__submit" style={{ marginTop: 6 }}>
            Créer mon compte
          </button>
        </form>

        <div className="auth-page__switch">
          Déjà un compte ?{' '}
          <button className="auth-page__switch-btn" onClick={onNavigateToLogin}>
            Se connecter
          </button>
        </div>

      </div>
    </div>
  );
}
