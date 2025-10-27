# V.Connct - Frontend (Next.js + TypeScript + Tailwind)

## Overview
Minimal Next.js frontend to work with the provided backend starter. It supports:
- Register / Login (JWT)
- Chat page connecting to Socket.io using the JWT
- Mobile-responsive layout using Tailwind CSS

## Setup
1. Install:
   ```bash
   npm install
   ```
2. Create `.env.local` or set env var `NEXT_PUBLIC_API_URL` (defaults to http://localhost:3000)
3. Run:
   ```bash
   npm run dev
   ```
4. Use the Register page to create a user, then Login. After login the app redirects to `/chat`.

## Notes
- The app stores the JWT in `localStorage` under `token`. For production prefer httpOnly cookies.
- Socket.io connects with the token as a query parameter: `io(API_URL, { query: { token } })`.
