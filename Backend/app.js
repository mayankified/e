const express = require("express");
const cookieParser = require("cookie-parser");
const { Mongod } = require("./database/Mongo.js");
const cors=require('cors');
const app = express();
const dotenv = require('dotenv');
app.use(cookieParser());
app.use(express.json());
app.use(cors());

dotenv.config({
  path: "./Config/config.env",
});
// Call the Mongod function to connect to the database
Mongod();

// ROuter Imports
const User=require("./routes/userroutes");
app.use("/api/v1",User);

app.listen(5000, () => {
  console.log(`Server is running at Port: 5000`);
});

console.log(process.env.EMAIL_USER)
module.exports=app;
