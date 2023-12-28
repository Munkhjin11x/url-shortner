const express = require("express");
const mongoose = require("mongoose");
const nanoid = require("nanoid");
const dotenv = require('dotenv');
const Url = require('./schema/Url.js');
const cors = require("cors");

dotenv.config()

const PORT = process.env.PORT || 8000;
const MONGODB_URL = process.env.MONGODB_URL || "mongodb+srv://Munkhjin:99279353Aa!@cluster0.dhvxd3q.mongodb.net/?retryWrites=true&w=majority"


console.log(PORT, MONGODB_URL)

const app = express();
app.use(express.json());
app.use(cors())

app.get("/", async (_, response) => {
  const res = await Url.find();
  response.send(res).end();
});

app.get("/:url", async (request, response) => {
  try {
    const { url } = request.params;
    const res = await Url.findOne({
      shortUrl: url,
    });
    response.redirect(res.longUrl);
  } catch (error) {
    response.send(error)
  }
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
    console.log(PORT, 'running')
  } catch (error) {
    console.log("error");
  }
  console.log(`connected to mongodb port: ${PORT}`);
});