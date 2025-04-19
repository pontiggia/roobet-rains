# Roobet Rains

Roobet Rains is a web application that alerts you when a "rain" event is active on the Roobet casino. During a rain event, if you’re subscribed, you receive a share of the prize directly in your account. With the page open in the background, you will be notified with an alert when a rain event occurs. The app also provides user authentication and other functionalities.

## Features

- **Real-time alerts:** Uses WebSockets to receive live updates from the Roobet API.
- **User authentication:** Sign up, login, and protected routes using JWT.
- **User management:** Update coins, track claimed rains, and manage user data.
- **Rain event management:** Save new rain events and update existing ones.
- **Templating engine:** Server-side rendered views using Handlebars.

## Technologies

- **Backend:** Node.js, Express, MongoDB with Mongoose.
- **Real-time communication:** Socket.IO and the `ws` library.
- **Authentication:** JSON Web Tokens (JWT).
- **Frontend:** Handlebars templating, HTML, CSS.
- **Security:** Helmet, express-rate-limit, mongoSanitize, xss-clean, and hpp.

## Installation

1. **Clone the repository:**

```sh
git clone <REPOSITORY_URL>
cd roobet-rains
```

2. **Install dependencies:**
   ```sh
   npm install
   ```
3. **Create a `.env` file:**
   ```sh
   cp .env.example .env
   ```
4. **Set up environment variables:**
   ```txt
   DATABASE_STRING=your_database_connection_string
   DATABASE_PASSWORD=your_database_password
   PORT=3000
   JWT_SECRET=your_jwt_secret
   JWT_EXPIRES_IN=your_jwt_expires_in
   JWT_COOKIE_EXPIRES_IN=your_jwt_cookie_expires_in
   NODE_ENV=development
   ```
5. **Run the application:**
   ```sh
   npm start
   ```

### Additional Notes

- The project connects to the Roobet API via WebSocket to receive real-time rain updates.
- Security is enhanced with various middleware to sanitize input and limit request rates.
- The application notifies you when a rain event is active so you can claim your portion of the reward.
