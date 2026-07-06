# CineTrack — Movie Review & Watchlist App

A full-stack movie discovery app built with **React**, **Node.js/Express**, **MongoDB**, and **The Movie Database (TMDB) API**.

Users can search movies, manage a watchlist, rate films, write reviews, follow other users, and get genre-based recommendations.

## Features

- **Authentication** — Register, login, JWT tokens, bcrypt password hashing
- **Movie Discovery** — Search, popular, top-rated, upcoming, genre filters (via TMDB)
- **Movie Details** — Poster, cast, director, trailer, TMDB rating
- **Watchlist** — Plan to Watch / Watching / Watched statuses, personal notes & ratings
- **Reviews** — Write, edit, delete reviews with optional spoiler warnings
- **Social** — Like reviews, follow users, public profiles & watchlists
- **Recommendations** — Genre-based suggestions from watched/rated movies
- **Admin Panel** — Moderate reported reviews, view usage stats
- **Dark Mode** — Toggle light/dark theme

## Tech Stack

| Layer    | Technology              |
|----------|-------------------------|
| Frontend | React, Vite, React Router, Axios |
| Backend  | Node.js, Express        |
| Database | MongoDB, Mongoose       |
| External | TMDB API                |

## Prerequisites

- Node.js 18+
- MongoDB (local or [MongoDB Atlas](https://www.mongodb.com/atlas))
- [TMDB API key](https://www.themoviedb.org/settings/api) (free)

## Setup

### 1. Clone and install

```bash
cd movies_page

# Install server dependencies
cd server
npm install

# Install client dependencies
cd ../client
npm install
```

### 2. Configure environment

Copy the server env example and add your keys:

```bash
cd server
cp .env.example .env
```

Edit `server/.env`:

```env
PORT=5000
MONGODB_URI=mongodb://127.0.0.1:27017/cinetrack
JWT_SECRET=your_super_secret_jwt_key_change_in_production
TMDB_API_KEY=your_tmdb_api_key_here
CLIENT_URL=http://localhost:5173
```

### 3. Start MongoDB

Make sure MongoDB is running locally, or use a MongoDB Atlas connection string in `MONGODB_URI`.

### 4. Run the app

**Terminal 1 — Backend:**

```bash
cd server
npm run dev
```

**Terminal 2 — Frontend:**

```bash
cd client
npm run dev
```

Open [http://localhost:5173](http://localhost:5173).

### 5. Create an admin user (optional)

Register a normal account, then in MongoDB set the user's role:

```js
db.users.updateOne({ email: "your@email.com" }, { $set: { role: "admin" } })
```

## API Routes

| Method | Route | Description |
|--------|-------|-------------|
| POST | `/api/auth/register` | Register |
| POST | `/api/auth/login` | Login |
| GET | `/api/auth/me` | Current user |
| GET | `/api/movies/search?query=` | Search movies |
| GET | `/api/movies/popular` | Popular movies |
| GET | `/api/movies/top-rated` | Top rated |
| GET | `/api/movies/upcoming` | Upcoming |
| GET | `/api/movies/:tmdbId` | Movie details |
| GET | `/api/movies/genre/:genreId` | Movies by genre |
| POST | `/api/watchlist` | Add to watchlist |
| GET | `/api/watchlist/me` | My watchlist |
| PATCH | `/api/watchlist/:tmdbId` | Update watchlist item |
| DELETE | `/api/watchlist/:tmdbId` | Remove from watchlist |
| POST | `/api/reviews` | Create review |
| GET | `/api/reviews/movie/:tmdbId` | Movie reviews |
| GET | `/api/recommendations/me` | Personalized recommendations |

See the full spec in the project brief for all routes.

## Project Structure

```
movies_page/
├── client/                 # React frontend
│   └── src/
│       ├── api/            # API client modules
│       ├── components/     # Reusable UI components
│       ├── context/        # Auth & theme context
│       ├── pages/          # Route pages
│       └── routes/         # App routing
└── server/                 # Express backend
    └── src/
        ├── config/         # DB connection
        ├── controllers/    # Route handlers
        ├── middleware/     # Auth, admin, errors
        ├── models/         # Mongoose schemas
        ├── routes/         # API routes
        └── services/       # TMDB integration
```

## Data Architecture

| Data | Source |
|------|--------|
| Posters, cast, runtime, trailers | TMDB API |
| User accounts, watchlists, ratings, reviews | MongoDB |
| Follow relationships, reports | MongoDB |

Movie snapshots (`tmdbId`, `title`, `posterPath`) are cached in MongoDB for faster watchlist loading.

## License

MIT — portfolio/educational use.
