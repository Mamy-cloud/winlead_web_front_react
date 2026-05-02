# Winlead — Dashboard

Dashboard React pour piloter un système d'appels IA (VAPI + Twilio + Hetzner).

## Installation

```bash
npm install
npm run dev
```

## Structure du projet

```
src/
├── styles/
│   └── global.css              # Variables CSS, reset, utilitaires partagés
│
├── components/
│   ├── Sidebar/
│   │   ├── Sidebar.jsx         # Navigation latérale
│   │   └── Sidebar.css         # Styles sidebar
│   └── Topbar/
│       ├── Topbar.jsx          # Barre supérieure + toggle IA
│       └── Topbar.css          # Styles topbar
│
├── pages/
│   ├── Dashboard/
│   │   ├── Dashboard.jsx       # Vue d'ensemble + métriques
│   │   └── Dashboard.css
│   ├── Calls/
│   │   ├── Calls.jsx           # Historique + enregistrements
│   │   └── Calls.css
│   ├── Status/
│   │   ├── Status.jsx          # Statut artisan + planning
│   │   └── Status.css
│   ├── Stats/
│   │   ├── Stats.jsx           # Statistiques & analytics
│   │   └── Stats.css
│   ├── IASettings/
│   │   ├── IASettings.jsx      # Modèle LLM, voix TTS, prompt
│   │   └── IASettings.css
│   ├── Clients/
│   │   ├── Clients.jsx         # Répertoire clients + statuts
│   │   └── Clients.css
│   ├── Config/
│   │   ├── Config.jsx          # Twilio + webhook Hetzner
│   │   └── Config.css
│   ├── Logs/
│   │   ├── Logs.jsx            # Logs système + monitoring
│   │   └── Logs.css
│   └── Auth/
│       ├── Auth.jsx            # Profil + sécurité
│       └── Auth.css
│
├── App.jsx                     # Layout principal + routage par état
└── main.jsx                    # Point d'entrée React
```

## Convention CSS

- `global.css` : variables, reset, classes utilitaires réutilisables
  (`.card`, `.badge-*`, `.btn-*`, `.form-*`, `.toggle-*`, `.metric-*`, etc.)
- `[Composant].css` : styles spécifiques au composant uniquement,
  préfixés avec le nom du composant (`sidebar__`, `topbar__`, `calls__`…)

## Stack

- React 18 + Vite
- CSS Modules-style (CSS par composant, pas de bibliothèque)
- Polices : DM Sans + JetBrains Mono (Google Fonts)
