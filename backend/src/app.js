import express from "express";
import dotenv from "dotenv";
dotenv.config({ path: "./.env" });
import { connectDB } from "./util/database.js";
import authRoutes from "./routes/authRoutes.js";
import bodyParser from "body-parser";

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

app.use("/auth", authRoutes);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

connectDB().then(async () => {
  app.listen(port, () => {
    console.log("Server is running on port " + port);
  });
});
