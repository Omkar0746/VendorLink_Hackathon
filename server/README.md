# VendorLink Backend (Express + MongoDB Atlas)

## Setup
1. Copy `.env.example` -> `.env` and fill values:
   - MONGO_URI (from Atlas)
   - JWT_SECRET (random string)
   - FRONTEND_URL (e.g. http://127.0.0.1:5500)

2. Install packages
   cd server
   npm install

3. Start server (development)
   npm run dev

Server runs on http://localhost:5000
API:
- POST /api/auth/signup   { name, email, password, role }
- POST /api/auth/login    { email, password }
- GET  /api/auth/me       (protected)
- GET  /api/products
- POST /api/products      (protected)
- GET  /api/products/:id
- PUT  /api/products/:id  (protected)
- DELETE /api/products/:id (protected)
