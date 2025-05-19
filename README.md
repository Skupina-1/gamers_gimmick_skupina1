# Gamers Gimmick

**Gamers Gimmick** is a full-stack MERN (MongoDB, Express, React, Node.js) web application that allows users to browse, rent, and manage board games online.

---

## Features

- User authentication with JWT
- Browse and search a catalog of board games
- Add games to basket and checkout
- Manage active rentals and return games
- View rental history
- User profile
- Responsive UI

---

## Tech Stack

**Frontend:**

- React
- React Router
- Axios
- CSS Modules

**Backend:**

- Node.js
- Express
- MongoDB + Mongoose

**Other:**

- JWT for authentication
- RESTful API
- CORS enabled for local dev

---

## Project Structure

```
gamers_gimmick_skupina1/
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── public/
│   ├── .env
│   └── server.js
├── frontend/
│   ├── public/
│   ├── .env
│   └── src/
│       ├── components/
│       ├── pages/
│       ├── static/
│       ├── styles/
│       ├── utils/
│       ├── App.js
│       ├── index.js
│       └── index.css
└── README.md
```

---

## Getting Started

### Prerequisites

- Node.js (v18+)
- MongoDB (local or Atlas)

---

### 1️. Clone the Repository

```bash
git clone https://github.com/yourusername/gamers_gimmick.git
cd gamers_gimmick_skupina1
```

---

### 2️. Install Dependencies

**Backend:**

```bash
cd backend
npm install
```

**Frontend:**

```bash
cd ../frontend
npm install
```

---

### 3. Set Up Environment Variables

**Backend – `.env`**

```
MONGO_URI=mongodb://localhost:27017/gamers_gimmick
JWT_SECRET=your_jwt_secret
PORT=5000
```

**Frontend – `.env`**

```
REACT_APP_WEB3FORMS_KEY=api_key

```

---

### 4. Start the Application

**Backend:**

```bash
cd backend
npm run dev
```

**Frontend:**

```bash
cd frontend
npm start
```

- Frontend: [http://localhost:3000](http://localhost:3000)
- Backend: [http://localhost:5000](http://localhost:5000)

---

**⚠️ Important:** Do **not** use your real email address or password when creating an account on the site. This is a student project and does not implement advanced security practices.

---

## API Overview

| Method | Endpoint                       | Description                     |
| ------ | ------------------------------ | ------------------------------- |
| POST   | `/api/users/register`          | Register new user               |
| POST   | `/api/users/login`             | User login                      |
| GET    | `/api/users/profile`           | Get user profile (auth)         |
| GET    | `/api/games`                   | List all games                  |
| GET    | `/api/games/:id`               | Get game by ID                  |
| POST   | `/api/games/add`               | Add a new game                  |
| PATCH  | `/api/games/:id`               | Update game                     |
| DELETE | `/api/games/:id`               | Delete game                     |
| GET    | `/api/basket`                  | Get user's basket               |
| POST   | `/api/basket/add`              | Add game to basket              |
| DELETE | `/api/basket/remove/:gameId`   | Remove game from basket         |
| POST   | `/api/basket/checkout`         | Checkout and create transaction |
| GET    | `/api/transactions/my`         | View user’s transactions        |
| PATCH  | `/api/transactions/return/:id` | Return a rental                 |

---

## Usage Guide

1. Register or log in.
2. Browse and add board games to your basket.
3. Proceed to checkout to rent selected games.
4. View and return active rentals.
5. Track your rental history from your profile.

---

## Developer Notes

- Game images are stored in `/images` and served statically by the backend.
- Update `MONGO_URI` in `.env`
- JWT tokens are stored in `localStorage` on the frontend.
- Error handling and protected routes are implemented.
- Alerts are made with toastify for visual purposes
- **Contact form uses [Web3Forms](https://web3forms.com/) for email submissions.**
- **API endpoints were tested using [Postman](https://www.postman.com/).**

---

```

```
