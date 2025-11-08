# Deployment Guide

## Prerequisites

- Node.js 18+ installed
- PostgreSQL database
- Clerk account for authentication
- TMDB API account

## Environment Variables

Create a `.env` file based on `.env.example`:

```bash
cp .env.example .env
```

Required variables:
- `VITE_PUBLIC_CLERK_PUBLISHABLE_KEY` - Clerk publishable key
- `VITE_CLERK_SECRET_KEY` - Clerk secret key
- `VITE_TMDB_API_KEY` - TMDB API key
- `VITE_TMDB_READ_ACCESS_TOKEN` - TMDB read access token
- `DATABASE_URL` - PostgreSQL connection string
- `VITE_API_URL` - Backend API URL

## Frontend Deployment (Vercel)

### Option 1: Deploy via Vercel CLI

1. Install Vercel CLI:
```bash
npm i -g vercel
```

2. Deploy:
```bash
vercel
```

3. Add environment variables in Vercel dashboard

### Option 2: Deploy via GitHub

1. Push code to GitHub
2. Import project in Vercel dashboard
3. Configure environment variables
4. Deploy

## Backend Deployment (Railway/Render)

### Railway

1. Create new project on Railway
2. Connect GitHub repository
3. Add PostgreSQL service
4. Configure environment variables
5. Set start command: `yarn start:server`
6. Deploy

### Render

1. Create new Web Service on Render
2. Connect GitHub repository
3. Set build command: `yarn install && yarn build:server && yarn prisma:migrate`
4. Set start command: `yarn start:server`
5. Add PostgreSQL database
6. Configure environment variables
7. Deploy

## Database Setup

Run migrations:
```bash
yarn prisma:migrate
```

Generate Prisma client:
```bash
yarn prisma:generate
```

## Local Development

1. Install dependencies:
```bash
yarn install
```

2. Setup database:
```bash
yarn prisma:migrate
```

3. Start frontend:
```bash
yarn dev
```

4. Start backend (in another terminal):
```bash
yarn dev:server
```

## Production Build

Frontend:
```bash
yarn build
```

Backend:
```bash
yarn build:server
```

## Important Notes

- Frontend requires `VITE_API_URL` to point to deployed backend
- Backend requires `DATABASE_URL` for PostgreSQL connection
- Clerk requires callback URLs to be configured
- TMDB API has rate limits
