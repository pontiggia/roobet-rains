import express from "express";
import path from "path";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import mongoSanitize from "express-mongo-sanitize";
import xss from "xss-clean";
import hpp from "hpp";
import cookieParser from "cookie-parser";

import AppError from "./utils/appError.js";
import globalErrorHandler from "./controllers/errorController.js";
import userRoutes from "./routes/userRoutes.js";
import rainRoutes from "./routes/rainRoutes.js";
import viewRoutes from "./routes/viewRoutes.js";

const app = express();
const __dirname = path.dirname(new URL(import.meta.url).pathname);

app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.set("view engine", "pug"); // Motor de plantillas
app.set("views", path.join(__dirname, "views")); // Directorio donde se encuentran las plantillas

app.use(helmet());

// Set X-XSS-Protection header
app.use((req, res, next) => {
  res.setHeader("X-XSS-Protection", "1; mode=block");
  next();
});

// Limit requests from same API
const limiter = rateLimit({
    max: 50,
    windowMs: 60 * 60 * 1000,
    message: "Too many requests from this IP, please try again in an hour!",
  });
app.use("/api", limiter);

// Security middlewares
app.use(mongoSanitize());
app.use(xss());
app.use(hpp());

// Routes
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/rains", rainRoutes);
app.use("/", viewRoutes);


app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);

export default app;
