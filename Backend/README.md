# Food Rush API

## Setup

1. Install dependencies with `npm install`.
2. Start MongoDB, then run `npm run dev` for development or `npm start` for production.

Without a `.env` file, the API connects to the local `food-rush` database at `mongodb://127.0.0.1:27017/food-rush`. To use a hosted or differently configured database, copy `.env.example` to `.env` and set `MONGODB_URI`. The API listens on port `5000` by default; set `CLIENT_URL` if the frontend origin differs from `http://localhost:5173`.

Set `AUTH_TOKEN_SECRET` to a long random value for deployments. If omitted, a temporary secret is generated at startup and active sessions expire when the API restarts.

## Registration

`POST /api/auth/register`

```json
{
  "name": "Your Name",
  "email": "you@example.com",
  "password": "at-least-8-characters"
}
```

Successful registration returns `201` with the new user's ID, name, and email. Passwords are stored as salted scrypt hashes and are never included in API responses. Duplicate email addresses return `409`.

`POST /api/auth/login` verifies an email/password pair and returns a signed bearer token and user profile. Send the token in `Authorization: Bearer <token>` for `GET /api/auth/me` and administrator routes. Tokens expire after seven days. Public registration always creates a customer account; it does not accept a role from the client. Customer profile data is returned only for the account matching the authenticated token.

`GET /api/admin/overview` requires an authenticated admin account and returns MongoDB status plus up to 100 registered users. The frontend displays the customer account panel at `/account` and the admin panel at `/admin`, using the same dashboard layout. To promote an account to admin, register it first, then update it in `mongosh`:

```javascript
db.users.updateOne(
  { email: "admin@example.com" },
  { $set: { role: "admin" } }
)
```

Log out and back in after changing an account's role. Orders and menu items are not yet persisted in the backend.

## Structure

```text
src/
  app.js
  server.js
  config/database.js
  controllers/adminController.js
  controllers/authController.js
  middleware/errorHandler.js
  middleware/requireAuth.js
  models/User.js
  routes/adminRoutes.js
  routes/authRoutes.js
  utils/authToken.js
  utils/password.js
```
