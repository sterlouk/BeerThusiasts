# beerthusiasts — Backend

Minimal instructions to run the backend API locally.

Prerequisites:
- Node.js (v16+ recommended)
- MySQL server running and accessible

Create a `.env` file in this folder with your database credentials:

```
DB_HOST=127.0.0.1
DB_USER=root
DB_PASSWORD=ster
DB_NAME=beersthuasiasts
```

Install and start the dev server:

```powershell
cd backend
npm install
npm run dev
```

The server listens on http://localhost:5001 by default.

Endpoints are mounted under `/api` (e.g. `/api/beers`, `/api/pubs`, `/api/admin`).

If you need to initialize sample data, run your SQL scripts or use the existing migration utilities in `src`.