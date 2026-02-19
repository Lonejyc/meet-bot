# MeetBot

## Prérequis

- **Node.js** >= 18 + **pnpm**
- **Python** >= 3.12
- **Docker** + **Docker Compose**

## Installation

### 1. Variables d'environnement

```bash
cp .env.example .env
# Modifier les valeurs dans .env si nécessaire
```

### 2. Base de données (PostgreSQL via Docker)

```bash
docker compose up -d
```

La base est accessible sur `localhost:54323`.

### 3. Backend (Django)

```bash
cd backend
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver
```

L'API est accessible sur `http://localhost:8000/api/`.

Health check : `GET http://localhost:8000/api/health/`

### 4. Frontend (Next.js)

```bash
cd frontend
pnpm install
pnpm dev
```

L'app est accessible sur `http://localhost:3000`.

## Structure du projet

```
MeetBot/
├── docker-compose.yml      # PostgreSQL 16
├── .env                    # Variables d'environnement (git ignored)
├── .env.example            # Template
├── frontend/               # Next.js + React + TypeScript + Tailwind
│   ├── src/app/            # App Router
│   └── ...
├── backend/                # Django + DRF
│   ├── config/             # Configuration Django
│   ├── api/                # App API REST
│   ├── manage.py
│   └── requirements.txt
└── README.md
```
