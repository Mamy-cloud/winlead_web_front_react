import { useState } from 'react';
import './Clients.css';

const CLIENTS = [
  { initials: 'ML', name: 'Marie Lambert',  phone: '+33 6 12 34 56 78', calls: 3,  lastCall: 'Aujourd\'hui',  badge: 'new',     label: 'Nouveau',    avatarStyle: {} },
  { initials: 'TM', name: 'Thomas Martin',  phone: '+33 6 55 44 33 22', calls: 7,  lastCall: 'Hier',           badge: 'pending', label: 'En attente', avatarStyle: {} },
  { initials: 'SB', name: 'Sophie Bernard', phone: '+33 7 98 76 54 32', calls: 12, lastCall: 'Il y a 3 jours', badge: 'done',    label: 'Terminé',    avatarStyle: { background: '#EAF3DE', color: '#3B6D11' } },
  { initials: 'CM', name: 'Claire Morin',   phone: '+33 6 11 22 33 44', calls: 2,  lastCall: 'Il y a 1 sem.',  badge: 'new',     label: 'Nouveau',    avatarStyle: { background: '#FAEEDA', color: '#854F0B' } },
  { initials: 'PD', name: 'Pierre Dubois',  phone: '+33 7 00 11 22 33', calls: 1,  lastCall: 'Aujourd\'hui',   badge: 'missed',  label: 'À rappeler', avatarStyle: { background: '#FCEBEB', color: '#A32D2D' } },
  { initials: 'RV', name: 'René Vidal',     phone: '+33 6 77 88 99 00', calls: 5,  lastCall: 'Il y a 2 sem.',  badge: 'done',    label: 'Terminé',    avatarStyle: { background: '#EAF3DE', color: '#3B6D11' } },
];

export default function Clients() {
  const [search, setSearch] = useState('');

  const filtered = CLIENTS.filter(c =>
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.phone.includes(search)
  );

  return (
    <div>
      <div className="card">
        <div className="card-header">
          <span className="card-title">👥 Mes clients ({filtered.length})</span>
          <input
            className="form-input"
            style={{ width: 200, fontSize: 13, padding: '7px 12px' }}
            placeholder="🔍 Rechercher..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>

        {filtered.map(c => (
          <div className="clients__row" key={c.name}>
            <div className="avatar" style={c.avatarStyle}>{c.initials}</div>
            <div className="clients__info">
              <div className="clients__name">{c.name}</div>
              <div className="clients__meta">📞 {c.phone} · {c.calls} appel{c.calls > 1 ? 's' : ''} · {c.lastCall}</div>
            </div>
            <span className={'badge badge-' + c.badge} style={{ marginRight: 8 }}>{c.label}</span>
            <a href={'tel:' + c.phone.replace(/\s/g, '')} className="clients__call-btn">
              📞 Appeler
            </a>
          </div>
        ))}

        {filtered.length === 0 && (
          <div style={{ padding: '24px 0', textAlign: 'center', color: 'var(--text-tertiary)', fontSize: 14 }}>
            Aucun client trouvé
          </div>
        )}
      </div>
    </div>
  );
}
