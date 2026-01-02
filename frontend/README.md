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

