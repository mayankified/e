import express, { json } from "express";
import cookieParser from "cookie-parser";
import { config } from "dotenv";
import { Mongod } from "./database/Mongo.js";
import userrouter from "./Routes/user.js";
import cors from 'cors'

const app = express();
app.use(cookieParser());
app.use(express.json());
app.use(cors());

config({
  path: "./Config/config.env",
});

Mongod();

app.use('/api/v1/user',userrouter);


app.get("/", (req, res) => {
  res.send("Server is running");
 
});

app.listen(5000, () => {
  console.log(`Server is running at Port:${process.env.PORT}`);
});
