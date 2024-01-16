import mongoose from "mongoose";

export const Mongod = () => {
  mongoose
    .connect("mongodb://127.0.0.1:27017", {
      dbName: "backend",
    })
    .then(() => {
      console.log("Database Connected!!");
    })
    .catch((e) => console.log(e));
};
