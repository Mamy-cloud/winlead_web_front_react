import { useState } from 'react';
import './IASettings.css';

const SECTIONS = [
  {
    id: 'identity',
    emoji: '👤',
    title: 'Qui es-tu ?',
    sub: 'Présente ton entreprise à l\'IA',
    fields: [
      { id: 'prenom',    label: 'Ton prénom',          placeholder: 'ex : Jean',         type: 'text' },
      { id: 'metier',    label: 'Ton métier',           placeholder: 'ex : Plombier',     type: 'text' },
      { id: 'ville',     label: 'Ta ville',             placeholder: 'ex : Lyon',         type: 'text' },
      { id: 'entreprise',label: 'Nom de ton entreprise',placeholder: 'ex : Plomberie Dupont', type: 'text' },
    ],
  },
  {
    id: 'behavior',
    emoji: '🎯',
    title: 'Comment l\'IA doit se comporter ?',
    sub: 'Coche ce que tu veux que l\'IA fasse',
    checks: [
      { id: 'rdv',       label: '📅 Proposer des rendez-vous',        defaultOn: true  },
      { id: 'devis',     label: '💰 Informer que les devis sont gratuits', defaultOn: false },
      { id: 'urgence',   label: '🚨 Repérer les urgences',             defaultOn: true  },
      { id: 'rappel',    label: '📞 Promettre un rappel dans 30 min',  defaultOn: true  },
      { id: 'prix',      label: '🚫 Ne jamais donner de prix par téléphone', defaultOn: true },
      { id: 'coordo',    label: '📝 Toujours noter le nom et le numéro', defaultOn: true },
    ],
  },
  {
    id: 'tone',
    emoji: '💬',
    title: 'Quel ton ?',
    sub: 'Comment l\'IA parle à tes clients',
    options: [
      { id: 'pro',       label: 'Professionnel',  emoji: '👔', desc: 'Formel et rassurant' },
      { id: 'friendly',  label: 'Chaleureux',     emoji: '😊', desc: 'Sympa et accessible' },
      { id: 'neutral',   label: 'Neutre',         emoji: '😐', desc: 'Simple et direct'    },
    ],
  },
  {
    id: 'unavailable',
    emoji: '📵',
    title: 'Message si tu n\'es pas disponible',
    sub: 'Ce que l\'IA dit quand tu es occupé ou hors ligne',
    field: { id: 'msg_indispo', placeholder: 'ex : Jean est actuellement en intervention. Il vous rappellera dans les plus brefs délais. Laissez-moi vos coordonnées.', type: 'textarea' },
  },
];

function buildPrompt(data) {
  const { prenom, metier, ville, entreprise, checks, tone, msg_indispo } = data;
  const name = prenom || 'l\'artisan';
  const job  = metier  || 'artisan';
  const loc  = ville   ? ` à ${ville}` : '';
  const co   = entreprise ? `, entreprise ${entreprise}` : '';

  const rules = [];
  if (checks.coordo)  rules.push('- Toujours collecter le prénom, nom et numéro de téléphone du client.');
  if (checks.rdv)     rules.push('- Proposer des créneaux de rendez-vous disponibles.');
  if (checks.urgence) rules.push('- Identifier si la situation est urgente et le signaler clairement dans le résumé.');
  if (checks.rappel)  rules.push('- Promettre un rappel de ' + name + ' dans les 30 minutes si urgent.');
  if (checks.prix)    rules.push('- Ne jamais donner de prix ou d\'estimation par téléphone.');
  if (checks.devis)   rules.push('- Mentionner que les devis sont gratuits et sans engagement.');

  const toneMap = { pro: 'professionnel et rassurant', friendly: 'chaleureux et accessible', neutral: 'neutre et direct' };
  const toneStr = toneMap[tone] || 'professionnel';

  const indispo = msg_indispo || `${name} est actuellement en intervention. Il vous rappellera dans les plus brefs délais.`;

  return `Tu es l'assistant vocal de ${name}, ${job}${loc}${co}.
Ton rôle est de répondre aux appels entrants à sa place de manière ${toneStr}.

RÈGLES STRICTES :
${rules.length ? rules.join('\n') : '- Être poli et serviable.'}

SI ${name.toUpperCase()} EST INDISPONIBLE :
"${indispo}"

FIN D'APPEL :
Résume toujours la conversation : nom du client, numéro, motif de l'appel et niveau d'urgence.`;
}

export default function IASettings() {
  const [form, setForm] = useState({
    prenom: '', metier: '', ville: '', entreprise: '', msg_indispo: '',
  });
  const [checks, setChecks] = useState({
    rdv: true, devis: false, urgence: true, rappel: true, prix: true, coordo: true,
  });
  const [tone,   setTone]   = useState('pro');
  const [saved,  setSaved]  = useState(false);
  const [copied, setCopied] = useState(false);
  const [voice,  setVoice]  = useState('emma');
  const [showPrompt, setShowPrompt] = useState(false);

  const setField = key => e => setForm(f => ({ ...f, [key]: e.target.value }));
  const flipCheck = id => setChecks(c => ({ ...c, [id]: !c[id] }));

  const prompt = buildPrompt({ ...form, checks, tone });

  const handleSave = () => { setSaved(true); setTimeout(() => setSaved(false), 2500); };

  const handleCopy = () => {
    navigator.clipboard.writeText(prompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div>
      {/* SECTION 1 — Identité */}
      <div className="card">
        <div className="card-header">
          <span className="card-title">👤 Qui es-tu ?</span>
          <span className="ia__step-badge">Étape 1 / 4</span>
        </div>
        <p className="ia__intro">Ces informations permettent à l'IA de se présenter à tes clients.</p>
        <div className="grid-2" style={{ marginBottom: 0 }}>
          {SECTIONS[0].fields.map(f => (
            <div className="form-row" key={f.id}>
              <label className="form-label">{f.label}</label>
              <input
                className="form-input"
                placeholder={f.placeholder}
                value={form[f.id]}
                onChange={setField(f.id)}
              />
            </div>
          ))}
        </div>
      </div>

      {/* SECTION 2 — Comportement */}
      <div className="card">
        <div className="card-header">
          <span className="card-title">🎯 Que doit faire l'IA ?</span>
          <span className="ia__step-badge">Étape 2 / 4</span>
        </div>
        <p className="ia__intro">Coche ce que tu veux que l'IA fasse pendant les appels.</p>
        <div className="ia__checks">
          {SECTIONS[1].checks.map(c => (
            <label key={c.id} className={'ia__check-row' + (checks[c.id] ? ' ia__check-row--on' : '')}>
              <input
                type="checkbox"
                checked={checks[c.id]}
                onChange={() => flipCheck(c.id)}
                style={{ display: 'none' }}
              />
              <span className="ia__check-box">{checks[c.id] ? '✅' : '⬜'}</span>
              <span className="ia__check-label">{c.label}</span>
            </label>
          ))}
        </div>
      </div>

      {/* SECTION 3 — Ton */}
      <div className="card">
        <div className="card-header">
          <span className="card-title">💬 Quel ton ?</span>
          <span className="ia__step-badge">Étape 3 / 4</span>
        </div>
        <p className="ia__intro">Comment l'IA doit parler à tes clients.</p>
        <div className="ia__tone-options">
          {SECTIONS[2].options.map(o => (
            <button
              key={o.id}
              className={'ia__tone-btn' + (tone === o.id ? ' ia__tone-btn--active' : '')}
              onClick={() => setTone(o.id)}
            >
              <span style={{ fontSize: 26 }}>{o.emoji}</span>
              <div>
                <div className="ia__tone-name">{o.label}</div>
                <div className="ia__tone-desc">{o.desc}</div>
              </div>
              {tone === o.id && <span className="ia__check-active">✓</span>}
            </button>
          ))}
        </div>
      </div>

      {/* SECTION 4 — Message indispo */}
      <div className="card">
        <div className="card-header">
          <span className="card-title">📵 Message si tu es occupé</span>
          <span className="ia__step-badge">Étape 4 / 4</span>
        </div>
        <p className="ia__intro">Ce que l'IA dit quand tu ne peux pas répondre.</p>
        <div className="form-row">
          <textarea
            className="form-input form-textarea"
            style={{ minHeight: 90, fontSize: 14 }}
            placeholder="ex : Jean est en intervention. Il vous rappelle dans 30 min. Laissez votre nom et numéro."
            value={form.msg_indispo}
            onChange={setField('msg_indispo')}
          />
        </div>
      </div>

      {/* PROMPT GÉNÉRÉ */}
      <div className="card ia__prompt-card">
        <div className="card-header">
          <span className="card-title">🤖 Prompt généré pour VAPI</span>
          <button className="ia__toggle-prompt" onClick={() => setShowPrompt(v => !v)}>
            {showPrompt ? 'Masquer' : 'Voir le prompt'}
          </button>
        </div>
        <p className="ia__intro">
          Ce prompt est automatiquement créé à partir de tes réponses.
          Copie-le et colle-le dans ton assistant VAPI.
        </p>

        {showPrompt && (
          <div className="ia__prompt-preview">
            <pre>{prompt}</pre>
          </div>
        )}

        <div className="ia__prompt-actions">
          <button className="btn-primary" onClick={handleSave}>
            {saved ? '✅ Sauvegardé !' : '💾 Sauvegarder'}
          </button>
          <button className="btn-secondary ia__copy-btn" onClick={handleCopy}>
            {copied ? '✅ Copié !' : '📋 Copier le prompt VAPI'}
          </button>
        </div>

        <div className="ia__vapi-hint">
          <span>👉</span>
          <span>
            Pour coller ce prompt dans VAPI : connecte-toi sur{' '}
            <a href="https://vapi.ai" target="_blank" rel="noreferrer">vapi.ai</a>
            {' '}→ ton assistant → "System Prompt" → colle le texte.
          </span>
        </div>
      </div>

      {/* Voix */}
      <div className="card">
        <div className="card-header"><span className="card-title">🎙 Voix de l'assistant</span></div>
        <p className="ia__intro">Choisis la voix que tes clients vont entendre.</p>
        <div className="ia__voices">
          {[
            { id: 'emma',    label: 'Emma',    desc: 'Voix féminine, douce',     emoji: '👩' },
            { id: 'nicolas', label: 'Nicolas', desc: 'Voix masculine, posée',    emoji: '👨' },
            { id: 'claire',  label: 'Claire',  desc: 'Voix féminine, dynamique', emoji: '👩‍💼' },
          ].map(v => (
            <button
              key={v.id}
              className={'ia__voice-btn' + (voice === v.id ? ' ia__voice-btn--active' : '')}
              onClick={() => setVoice(v.id)}
            >
              <span style={{ fontSize: 28 }}>{v.emoji}</span>
              <div>
                <div className="ia__voice-name">{v.label}</div>
                <div className="ia__voice-desc">{v.desc}</div>
              </div>
              {voice === v.id && <span className="ia__voice-check">✓</span>}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
