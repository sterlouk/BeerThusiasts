# beerthusiasts — Frontend

Short instructions to run the React development server.

Prerequisites:
- Node.js (v16+ recommended)

The frontend expects the backend API at `http://localhost:5001` by default. You can override this with an environment variable:

Create a `.env` file in the `frontend` folder (optional):

```
REACT_APP_API_BASE=http://localhost:5001
```

Install and start the dev server:

```powershell
cd frontend
npm install
npm start
```

Build for production:

```powershell
npm run build
```

Run tests:

```powershell
npm test
```

That's it — the app will open at http://localhost:3000 by default.

## Quick Start (One Command)

To instantly launch the entire application stack (database, backend API, and frontend) from the root directory:

```powershell
.\setup-and-launch.ps1
```

This script will:
1. Shut down any running Node.js processes
2. Install backend dependencies
3. Reset and populate the database
4. Install frontend dependencies
5. Launch the backend server (port 5001) and frontend (port 3000) in separate windows

**Note:** Run this from the `beerdb` root directory with PowerShell.

