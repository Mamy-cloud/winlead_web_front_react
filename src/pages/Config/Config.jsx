import './Config.css';

export default function Config() {
  return (
    <div>
      <div className="grid-2">
        {/* Twilio */}
        <div className="card">
          <div className="card-header"><span className="card-title">Twilio</span></div>
          <div className="form-row">
            <label className="form-label">Numéro Twilio connecté</label>
            <input className="form-input" defaultValue="+33 9 72 ••• •••" readOnly
              style={{ color: 'var(--text-secondary)' }} />
          </div>
          <div className="form-row">
            <label className="form-label">Account SID</label>
            <input className="form-input" defaultValue="AC••••••••••••••••••••••••••••••••" readOnly
              style={{ color: 'var(--text-secondary)', fontFamily: 'var(--font-mono)', fontSize: 11 }} />
          </div>
          <div className="form-row">
            <label className="form-label">Auth Token</label>
            <input className="form-input" type="password" defaultValue="token_secret_here" readOnly
              style={{ fontFamily: 'var(--font-mono)', fontSize: 11 }} />
          </div>
          <button className="btn-secondary">Reconnecter Twilio</button>
        </div>

        {/* Hetzner */}
        <div className="card">
          <div className="card-header"><span className="card-title">Backend Hetzner</span></div>
          <div className="form-row">
            <label className="form-label">Webhook URL</label>
            <input className="form-input" defaultValue="https://api.monserveur.hetzner.de/webhook"
              style={{ fontFamily: 'var(--font-mono)', fontSize: 11 }} />
          </div>
          <div className="form-row">
            <label className="form-label">Timeout fallback (secondes)</label>
            <input className="form-input" type="number" defaultValue={30} style={{ width: 80 }} />
          </div>
          <div className="form-row">
            <label className="form-label">Statut connexion</label>
            <div className="config__status">
              <div className="status-dot online" />
              Connecté — latence 48 ms
            </div>
          </div>
          <button className="btn-primary">Enregistrer</button>
        </div>
      </div>
    </div>
  );
}
