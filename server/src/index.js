import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";
import bodyParser from "body-parser";
import { connectDB } from "./config/db.js";
import authRouter from "./routes/authRoutes.js";
import chatRouter from "./routes/chatRoutes.js";
import messageRouter from "./routes/messageRoutes.js";
import userRouter from "./routes/userRoutes.js";
import groupRouter from "./routes/groupRoutes.js";
import { fileURLToPath } from "url";

const app = express();
const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();
app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/assets", express.static(path.join(__dirname, "../upload")));

// routes
app.use("/api/auth", authRouter);
app.use("/api/chat", chatRouter);
app.use("/api/message", messageRouter);
app.use("/api/users", userRouter);
app.use("/api/group", groupRouter);

// error handler
app.use((err, req, res, next) => {
  const errorStatus = err.status || 500;
  const errorMessage = err.message || "Somthing went wrong!";
  return res.status(errorStatus).send(errorMessage);
});

const port = process.env.PORT || 4000;

app.listen(port, () => {
  console.log(`server is running on port ${port}.`);
  connectDB();
});
