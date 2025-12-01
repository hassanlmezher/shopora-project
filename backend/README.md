# Shopora Backend

## Setup
- Install dependencies: `npm install` (from the `backend` directory).
- Copy `.env.example` to `.env` and set `MONGODB_URI` to your MongoDB Atlas connection string plus optional `PORT`.
- Run the dev server: `npm run dev` (with nodemon) or `npm start` for production.

## Contents
- `src/config/database.js` – MongoDB Atlas connection helper using Mongoose.
- `src/server.js` – Express bootstrap with a simple `/health` endpoint.
- Mongoose models in `src/models/`: `Product`, `Order`, `User`, `Store` (includes approval flag), `Cart`, `Review`, `Favorite`.
