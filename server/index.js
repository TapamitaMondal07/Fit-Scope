import express from "express";
import * as dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import UserRoutes from "./routes/User.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json({limit: "50mb"}));
app.use(express.urlencoded({extended: true}));

app.use("/api/user", UserRoutes);

// error handler
app.use((err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || "Something went wrong";
  return res.status(status).json({
    success: false,
    status,
    message,
  });
});

const connectDB = () => {
  mongoose.set("strictQuery", true);
  mongoose.connect(process.env.MONGODB_URL)
  .then((res) => console.log("MongoDB connected successfully"))
  .catch((err) => {
    console.log(err)
  })
}

const startServer = async () => {
  try{
    connectDB();
    app.listen(process.env.PORT, () => console.log(`Server running at ${process.env.PORT}`))
  } catch (err) {
    console.log(err);
  }
}

startServer();