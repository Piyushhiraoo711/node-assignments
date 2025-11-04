import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import { userRoutes } from "./routes/index.js";
import { connectDB } from "./database/db.js";
import verifyToken from "./middleware/verifyToken.js";
dotenv.config({});

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
const corsOptions = {
  origin: "http://localhost:5173",
  credentials: true,
};

app.use(cors(corsOptions));

const PORT = process.env.PORT || 3000;

app.use("/user", userRoutes);

app.listen(PORT, () => {
  connectDB();
  console.log(`server is running on PORT ${PORT}`);
});
