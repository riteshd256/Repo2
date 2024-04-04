import express from "express";
import cors from "cors";
import { config } from "dotenv";

import connectDB from "./config/db.js";
import authRoute from "./routes/authRoute.js";

config();
connectDB();

const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/api/v1/auth", authRoute);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`App is running on port ${PORT}`);
});
