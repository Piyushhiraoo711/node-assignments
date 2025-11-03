import express from "express";
import { userRoutes } from "./routes/index.js";
import { connectDB } from "./database/db.js";

const app = express();
app.use(express.json());

app.use("/user", userRoutes);

connectDB();

app.listen(5000, () => {
  console.log("server is running on port 5000");
});
