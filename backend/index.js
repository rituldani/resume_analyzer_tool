import express from "express"
import dotenv from "dotenv"
import connectDB from "./src/db/index.js";
import cookieParser from "cookie-parser";
import UserRoute from "./src/routes/user.routes.js"
import ResumeRoute from "./src/routes/resume.routes.js"
import cors from "cors"

import path from 'path';
import { fileURLToPath } from 'url';

const app = express()
dotenv.config()

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// config
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
}));

app.use(express.json({ limit: "16kb" }))
app.use(express.urlencoded({ limit: "16kb" }))
app.use(express.static("public"))
app.use(cookieParser());

app.use("/user", UserRoute)
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use("/resume", ResumeRoute);

// app.get("/", (req, res) => {
//   res.send("Welcome to the API!");
// });

const PORT = process.env.PORT;


connectDB();

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
