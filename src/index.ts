import express, { Application, Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db";
import { notFound, errorHandler } from "./middlewares/ErrorMiddleware";
import AuthRoutes from "./routes/AuthRoutes";
import AuthRoute from "./routes/AuthRoute";



const app: Application = express();

dotenv.config();

connectDB();

app.use(express.json());

// Enable CORS for all routes
app.use(cors({
  origin: "*",
}));

// Default
app.get("/api", (req: Request, res: Response) => {
  res.status(201).json({ message: "Welcome to Auth ts" });
});

// User Route
app.use("/api/auth", AuthRoutes);
app.use("/api/v1/user", AuthRoute);

// Middleware
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 4000;

app.listen(PORT, (): void => console.log(`Server is running on ${PORT}`));
