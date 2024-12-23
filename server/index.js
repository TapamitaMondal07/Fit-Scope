import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json({limit: "50mb" }));
app.use(express.urlencoded({ extended: true }));

app.get('/', async (req, res) => {
  res.status(200).json({
    message: "Hello",
  });
});

const connectDB = () => {
  mongoose.set("strictQuery", true);
  mongoose.connect(process.env.MONGODB_URL).then((res) => console.log("Connected to MongoDb"));
}

const startServer = async () => {
  try{
    connectDB();
    app.listen(process.env.PORT, () => {
      console.log(`Server running successfully at port ${process.env.PORT}`);
    })
  } catch (err) {
      console.log(err);
  }
}

startServer();
