# She Can Foundation Platform

Production-grade full-stack NGO platform with a premium public website and secured admin dashboard.

## Major Upgrades Completed

- Admin dashboard with analytics cards, searchable volunteer/contact tables, recent data views, and delete actions
- JWT-based admin authentication (login, protected routes, logout)
- Enhanced UX: inline validation, loading spinners, skeleton states, toast alerts, animated success popup
- Dark/Light mode with localStorage persistence and smooth transitions
- Stronger backend validation using `express-validator`
- Standardized API response format and centralized error handling

## Tech Stack

- Frontend: React, Vite, Tailwind CSS, Framer Motion, React Router, React Toastify
- Backend: Node.js, Express, MongoDB, Mongoose, JWT, bcryptjs, express-validator

## Quick Start

### 1) Backend
```bash
cd Backend
cp .env.example .env
npm install
npm run dev
```

### 2) Frontend
```bash
cd Frontend
cp .env.example .env
npm install
npm run dev
```

## Admin Login (for internship demo)

Configured in backend `.env`:
- `ADMIN_EMAIL=admin@shecanfoundation.org`
- Password for provided hash: `Admin@123`

Login URL:
- `http://localhost:5173/admin/login`

## Environment Variables

### Backend (`Backend/.env`)
- `PORT`
- `NODE_ENV`
- `MONGODB_URI`
- `CORS_ORIGIN`
- `RATE_LIMIT_WINDOW_MS`
- `RATE_LIMIT_MAX`
- `JWT_SECRET`
- `JWT_EXPIRES_IN`
- `ADMIN_EMAIL`
- `ADMIN_PASSWORD_HASH`

### Frontend (`Frontend/.env`)
- `VITE_API_BASE_URL`

## API Overview

Base: `/api/v1`

Public:
- `GET /health`
- `POST /volunteers`
- `POST /contacts`

Auth:
- `POST /auth/login`
- `GET /auth/session` (Bearer token)

Admin (Bearer token required):
- `GET /admin/summary`
- `GET /admin/volunteers?search=`
- `GET /admin/contacts?search=`
- `DELETE /admin/volunteers/:id`
- `DELETE /admin/contacts/:id`

## Build Verification

- Backend syntax check passed (`node --check src/server.js`)
- Frontend production build passed (`npm run build`)
