import { useState } from 'react';
import './Payment.css';

const PLANS = [
  {
    id: 'starter',
    name: 'Starter',
    price: 29,
    desc: 'Idéal pour démarrer',
    features: ['500 minutes IA / mois', '1 numéro Twilio', 'Transcriptions', 'Support email'],
  },
  {
    id: 'pro',
    name: 'Pro',
    price: 79,
    desc: 'Pour les artisans actifs',
    features: ['2 000 minutes IA / mois', '3 numéros Twilio', 'Transcriptions + résumés', 'Support prioritaire', 'Statistiques avancées'],
    popular: true,
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    price: 199,
    desc: 'Multi-artisans & agences',
    features: ['Minutes illimitées', 'Numéros illimités', 'Accès API', 'Support dédié', 'Onboarding personnalisé'],
  },
];

const INVOICES = [
  { id: 'INV-2025-041', date: '01/04/2025', montant: '79,00 €', plan: 'Pro' },
  { id: 'INV-2025-031', date: '01/03/2025', montant: '79,00 €', plan: 'Pro' },
  { id: 'INV-2025-021', date: '01/02/2025', montant: '29,00 €', plan: 'Starter' },
  { id: 'INV-2025-011', date: '01/01/2025', montant: '29,00 €', plan: 'Starter' },
];

export default function Payment() {
  const [currentPlan, setCurrentPlan] = useState('pro');
  const [tab, setTab] = useState('plans');

  return (
    <div>
      <div className="payment__tabs">
        {[
          { id: 'plans',    label: 'Abonnements' },
          { id: 'billing',  label: 'Moyen de paiement' },
          { id: 'invoices', label: 'Factures' },
        ].map(t => (
          <button
            key={t.id}
            className={'payment__tab' + (tab === t.id ? ' payment__tab--active' : '')}
            onClick={() => setTab(t.id)}
          >
            {t.label}
          </button>
        ))}
      </div>

      {tab === 'plans' && (
        <div>
          <div className="payment__plans-grid">
            {PLANS.map(plan => (
              <div
                key={plan.id}
                className={
                  'payment__plan-card' +
                  (plan.popular ? ' payment__plan-card--popular' : '') +
                  (currentPlan === plan.id ? ' payment__plan-card--active' : '')
                }
              >
                {plan.popular && <div className="payment__popular-badge">Recommandé</div>}
                <div className="payment__plan-name">{plan.name}</div>
                <div className="payment__plan-desc">{plan.desc}</div>
                <div className="payment__plan-price">
                  {plan.price} €<span>/mois</span>
                </div>
                <ul className="payment__plan-features">
                  {plan.features.map(f => (
                    <li key={f}>
                      <svg width="12" height="12" viewBox="0 0 16 16" fill="currentColor">
                        <path d="M13.3 4.3l-6 6a1 1 0 01-1.4 0l-3-3 1.4-1.4L6.75 8.19l5.15-5.3z"/>
                      </svg>
                      {f}
                    </li>
                  ))}
                </ul>
                <button
                  className={'payment__plan-btn' + (currentPlan === plan.id ? ' payment__plan-btn--current' : '')}
                  onClick={() => setCurrentPlan(plan.id)}
                  disabled={currentPlan === plan.id}
                >
                  {currentPlan === plan.id ? 'Plan actuel' : 'Choisir ce plan'}
                </button>
              </div>
            ))}
          </div>
          <div className="payment__renew-info">
            Prochain renouvellement le <strong>01/06/2025</strong> — Plan <strong>Pro — 79,00 €</strong>
          </div>
        </div>
      )}

      {tab === 'billing' && (
        <div className="grid-2">
          <div className="card">
            <div className="card-header"><span className="card-title">Carte enregistrée</span></div>
            <div className="payment__card-preview">
              <div className="payment__card-brand">
                <svg width="38" height="24" viewBox="0 0 38 24" fill="none">
                  <rect width="38" height="24" rx="4" fill="#1A1F71"/>
                  <circle cx="15" cy="12" r="7" fill="#EB001B" fillOpacity="0.9"/>
                  <circle cx="23" cy="12" r="7" fill="#F79E1B" fillOpacity="0.9"/>
                  <path d="M19 6.8a7 7 0 010 10.4A7 7 0 0119 6.8z" fill="#FF5F00"/>
                </svg>
              </div>
              <div className="payment__card-number">•••• •••• •••• 4242</div>
              <div className="payment__card-meta">
                <span>Jean Dupont</span>
                <span>Expire 09/27</span>
              </div>
            </div>
            <button className="btn-secondary" style={{ marginTop: 12 }}>Modifier la carte</button>
          </div>

          <div className="card">
            <div className="card-header"><span className="card-title">Ajouter une carte</span></div>
            <div className="form-row">
              <label className="form-label">Numéro de carte</label>
              <input className="form-input" placeholder="1234 5678 9012 3456" maxLength={19} />
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
              <div className="form-row">
                <label className="form-label">Expiration</label>
                <input className="form-input" placeholder="MM/AA" maxLength={5} />
              </div>
              <div className="form-row">
                <label className="form-label">CVC</label>
                <input className="form-input" placeholder="•••" maxLength={3} />
              </div>
            </div>
            <div className="form-row">
              <label className="form-label">Nom sur la carte</label>
              <input className="form-input" placeholder="Jean Dupont" />
            </div>
            <button className="btn-primary">Enregistrer</button>
            <div className="payment__secure-note">
              <svg width="11" height="11" viewBox="0 0 16 16" fill="currentColor">
                <path d="M8 1L2 4v4c0 3.5 2.5 6.7 6 7.4C11.5 14.7 14 11.5 14 8V4L8 1z"/>
              </svg>
              Paiement sécurisé via Stripe — vos données ne sont jamais stockées sur nos serveurs
            </div>
          </div>
        </div>
      )}

      {tab === 'invoices' && (
        <div className="card">
          <div className="card-header"><span className="card-title">Historique des factures</span></div>
          <table className="payment__invoices-table">
            <thead>
              <tr>
                <th>Référence</th>
                <th>Date</th>
                <th>Plan</th>
                <th>Montant</th>
                <th>Statut</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {INVOICES.map(inv => (
                <tr key={inv.id}>
                  <td className="payment__inv-ref">{inv.id}</td>
                  <td>{inv.date}</td>
                  <td>{inv.plan}</td>
                  <td>{inv.montant}</td>
                  <td><span className="badge badge-done">Payée</span></td>
                  <td>
                    <button className="payment__dl-btn">
                      <svg width="13" height="13" viewBox="0 0 16 16" fill="currentColor">
                        <path d="M8 1v9M4 7l4 4 4-4M2 13h12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" fill="none"/>
                      </svg>
                      PDF
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
