import express from "express";
import mongoose from "mongoose";
import { nanoid } from "nanoid";
import dotenv from 'dotenv'
import Url from './schema/Url.js'
import cors from "cors"

dotenv.config()

const PORT = process.env.PORT || 8000;
const MONGODB_URL = process.env.MONGODB_URL

const app = express();
app.use(express.json());
app.use(cors())

app.get("/", async (_, response) => {
  const res = await Url.find();
  response.send(res).end();
});

app.get("/:url", async (request, response) => {
  const { url } = request.params;
  const res = await Url.findOne({
    shortUrl: url,
  });
  response.redirect(res.longUrl);
});

app.post("/", async (request, response) => {
  const { url } = request.body;

  const newUrl = await Url.create({
    longUrl: url,
    shortUrl: nanoid(10),
  });
  response.send({ success: true, url: newUrl }).end();
});

app.delete("/:url", async (request, response) => {
  const { url } = request.params;
  const { acknowledged, deletedCount } = await Url.deleteOne({
    shortUrl: url,
  });
  response.send({ success: acknowledged, removedCount: deletedCount }).end();
});

app.listen(PORT, async () => {
  try {
    await mongoose.connect(MONGODB_URL);
  } catch (error) {
    console.log("error");
  }
  console.log(`connected to mongodb port: ${PORT}`);
});