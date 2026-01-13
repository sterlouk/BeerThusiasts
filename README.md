# 🍺 BeerDB - Beer Enthusiasts Application

A full-stack web application for beer enthusiasts to browse, review, and order craft beers. Built with React, Node.js, Express, and MySQL.

## 🚀 Quick Start

The easiest way to get the entire application running is with our automated setup script:

```powershell
.\setup-and-launch.ps1
```

This single command will:
1. ✅ Shut down any running Node.js servers
2. ✅ Install backend dependencies (if not already installed)
3. ✅ Initialize and populate the MySQL database with sample data
4. ✅ Install frontend dependencies (if not already installed)
5. ✅ Launch the backend API server on `http://localhost:5001`
6. ✅ Launch the frontend React app on `http://localhost:3000`

Both servers will open in separate terminal windows. Simply close them to stop the servers.

## 📋 Prerequisites

Before running the application, ensure you have:

- **Node.js** (v16 or higher recommended)
- **MySQL Server** running and accessible
- **PowerShell** (Windows) or similar shell environment

## 🛠️ Manual Setup

If you prefer to set up components individually:

### Backend Setup

1. Navigate to the backend directory:
   ```powershell
   cd backend
   ```

2. Create a `.env` file with your database credentials:
   ```
   DB_HOST=127.0.0.1
   DB_USER=root
   DB_PASSWORD=your_password
   DB_NAME=beersthuasiasts
   ```

3. Install dependencies:
   ```powershell
   npm install
   ```

4. Initialize the database:
   ```powershell
   node reset_db.js
   ```

5. Start the backend server:
   ```powershell
   npm start
   ```

The backend API will be available at `http://localhost:5001`

### Frontend Setup

1. Navigate to the frontend directory:
   ```powershell
   cd frontend
   ```

2. (Optional) Create a `.env` file to configure the API endpoint:
   ```
   REACT_APP_API_BASE=http://localhost:5001
   ```

3. Install dependencies:
   ```powershell
   npm install
   ```

4. Start the development server:
   ```powershell
   npm start
   ```

The React app will open at `http://localhost:3000`

### Production Build

To create a production build of the frontend:

```powershell
cd frontend
npm run build
```

## 📁 Project Structure

```
beerdb/
├── backend/               # Express API server
│   ├── src/
│   │   ├── controllers/   # Route controllers
│   │   ├── routes/        # API routes
│   │   ├── app.js         # Express app configuration
│   │   └── db.js          # Database connection
│   ├── public/images/     # Uploaded beer images
│   ├── reset_db.js        # Database initialization script
│   ├── dummy_data.sql     # Sample data
│   └── clean_tables.sql   # Table truncation script
├── frontend/              # React application
│   ├── src/
│   │   ├── components/    # Reusable React components
│   │   ├── pages/         # Page components
│   │   ├── api/           # API client functions
│   │   └── context/       # React Context providers
│   └── public/            # Static assets
├── dbDump.sql             # Complete database schema
└── setup-and-launch.ps1   # Automated setup script
```

## 🎮 Features

- **Beer Catalog**: Browse and search through a collection of craft beers
- **Reviews & Ratings**: Add reviews and ratings for beers
- **Shopping Cart**: Add beers to cart and place orders
- **Admin Panel**: Manage beers, brands, orders, pubs, employees and suppliers
- **Image Upload**: Upload and manage beer images
- **Tower Game**: Fun mini-game in the Playroom section

## 🗄️ Database

The application uses MySQL with the following main tables:
- `beers` - Beer products and details
- `brands` - Beer brands/breweries
- `pubs` - Pub/supplier information
- `orders` - Customer and supplier orders
- `reviews` - Beer reviews and ratings

The database is automatically initialized with sample data when running `reset_db.js` or the setup script.

## 🧪 Testing

Run frontend tests:

```powershell
cd frontend
npm test
```

## 📝 Code Citations

This project includes code snippets and inspiration from the following sources:

### Review Form Components

**License: Unknown**
- https://github.com/RichardFoil/milestone3/blob/f4a322acc612727866a59de59454beda3334a86c/frontend/src/CommentRatingForm.js
- https://github.com/rishavgn/tensorassg/blob/9c3f02aa179c3a4f9a348f8a97d8035fb211959d/client/src/screens/FeedbackForm.jsx
- https://github.com/mcshanebrendan/my-app/blob/75e763305873a195b24e5c8611c20d4008d7ae29/src/components/reviews.js

The review form implementation (rating input, comment textarea, and form submission) was adapted from these open-source examples.

## 🤖 Development Note

This application was built with the assistance of AI coding agents, which helped with:
- Code generation and scaffolding
- Debugging and troubleshooting
- Documentation and README creation
- Best practices and optimization suggestions

## 📄 License

This project is for educational and demonstration purposes.

---

**Enjoy exploring craft beers! 🍻**
