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

Install dependencies:

```powershell
cd backend
npm install
```

## Database Setup

To initialize the database with schema and dummy data, run:

```powershell
node reset_db.js
```

This will:
1. Load the database schema from `../dbDump.sql`
2. Clear all existing data
3. Load sample data from `dummy_data.sql`

To truncate only table data (without reloading schema), you can run the SQL file:

```sql
source clean_tables.sql
```

## Start the Dev Server

```powershell
npm run dev
```

The server listens on http://localhost:5001 by default.

Endpoints are mounted under `/api` (e.g. `/api/beers`, `/api/pubs`, `/api/orders`, `/api/admin`).