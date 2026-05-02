import { useState } from 'react';
import './Clients.css';

const CLIENTS = [
  { initials: 'ML', name: 'Marie Lambert',  phone: '+33 6 12 34 56 78', calls: 3,  badge: 'new',     label: 'Nouveau',    avatarStyle: {} },
  { initials: 'TM', name: 'Thomas Martin',  phone: '+33 6 55 44 33 22', calls: 7,  badge: 'pending', label: 'En cours',   avatarStyle: {} },
  { initials: 'SB', name: 'Sophie Bernard', phone: '+33 7 98 76 54 32', calls: 12, badge: 'done',    label: 'Terminé',    avatarStyle: { background: '#EAF3DE', color: '#3B6D11' } },
  { initials: 'CM', name: 'Claire Morin',   phone: '+33 6 11 22 33 44', calls: 2,  badge: 'new',     label: 'Nouveau',    avatarStyle: { background: '#FAEEDA', color: '#854F0B' } },
  { initials: 'PD', name: 'Pierre Dubois',  phone: '+33 7 00 11 22 33', calls: 1,  badge: 'missed',  label: 'À rappeler', avatarStyle: { background: '#FCEBEB', color: '#A32D2D' } },
  { initials: 'RV', name: 'René Vidal',     phone: '+33 6 77 88 99 00', calls: 5,  badge: 'done',    label: 'Terminé',    avatarStyle: { background: '#EAF3DE', color: '#3B6D11' } },
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
          <span className="card-title">Répertoire clients ({filtered.length})</span>
          <div className="clients__search-wrap">
            <input
              className="form-input"
              style={{ width: 180, fontSize: 12, padding: '5px 10px' }}
              placeholder="Rechercher..."
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>
        </div>

        {filtered.map(c => (
          <div className="clients__row" key={c.name}>
            <div className="avatar" style={c.avatarStyle}>{c.initials}</div>
            <div className="clients__info">
              <div className="clients__name">{c.name}</div>
              <div className="clients__meta">{c.phone} · {c.calls} appel{c.calls > 1 ? 's' : ''}</div>
            </div>
            <span className={`badge badge-${c.badge}`}>{c.label}</span>
          </div>
        ))}

        {filtered.length === 0 && (
          <div style={{ padding: '20px 0', textAlign: 'center', color: 'var(--text-tertiary)', fontSize: 13 }}>
            Aucun client trouvé
          </div>
        )}
      </div>
    </div>
  );
}
