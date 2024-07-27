import express from "express";
import path from "path";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import mongoSanitize from "express-mongo-sanitize";
import xss from "xss-clean";
import hpp from "hpp";
import cors from "cors";
import cookieParser from "cookie-parser";
import { engine } from "express-handlebars";
import { allowInsecurePrototypeAccess } from "@handlebars/allow-prototype-access";
import Handlebars from "handlebars";

import AppError from "./utils/appError.js";
import globalErrorHandler from "./controllers/errorController.js";
import userRoutes from "./routes/userRoutes.js";
import rainRoutes from "./routes/rainRoutes.js";
import viewRoutes from "./routes/viewRoutes.js";

const app = express();
const __dirname = path.resolve(); // Usamos path.resolve() para obtener el directorio raíz correctamente

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Middlewares
app.use(cookieParser());
app.use(express.static(path.resolve(__dirname, "src/public"))); // Asegúrate de que el directorio public esté dentro de src

// Configuración del motor de vistas con express-handlebars y allowInsecurePrototypeAccess
app.engine("handlebars", engine({
  handlebars: allowInsecurePrototypeAccess(Handlebars)
}));

app.set("view engine", "handlebars"); // Motor de plantillas
app.set("views", path.resolve(__dirname, "src/views")); // Directorio donde se encuentran las plantillas

app.use(cors());

// Seguridad
app.use(helmet());
app.use((req, res, next) => {
  res.setHeader("X-XSS-Protection", "1; mode=block");
  next();
});

// Límites de tasa
const limiter = rateLimit({
  max: 50,
  windowMs: 60 * 60 * 1000,
  message: "Too many requests from this IP, please try again in an hour!",
});
app.use("/api", limiter);

// Middlewares de seguridad adicionales
app.use(mongoSanitize());
app.use(xss());
app.use(hpp());

// Rutas
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/rains", rainRoutes);
app.use("/", viewRoutes);

// Manejo de rutas no encontradas
app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

// Manejo global de errores
app.use(globalErrorHandler);

export default app;