import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import router from "./routes/routes.js";
import dbConnect from "./connection/connect.js";
dotenv.config();
dbConnect();

const app = express();

app.use(express.json());
app.use(cors());
app.use("/", router);

const PORT = process.env.PORT;

app.get("/", async (req, res) => {
  res.json("Hello There its Kanhaiya");
});

app.listen(PORT, () => {
  console.log(`Server is running on PORT: ${PORT}`);
});
