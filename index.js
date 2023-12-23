// import mongoose from 'mongoose';
// import Url from './schema/Url.js';
// import express from 'express';
// import bodyParser from 'body-parser';
// const port = 8003
// const MongoDb = 'mongodb+srv://Munkhjin:99279353Aa!@cluster0.dhvxd3q.mongodb.net/?retryWrites=true&w=majority'
// const app = express();

// app.use(bodyParser.json())
// app.get('/', async (req, res) => {
//     const response = await Url.find({})
//     res.send({ response }).end()

// })

// app.post('/', async (req, res) => {
//     const newUrl = await Url.create(req.body)
//     res.send({ urls: newUrl }).end()
// });

// app.listen(port, async () => {
//     try {
//         await mongoose.connect(MongoDb)
//         console.log('ready');
//     } catch (error) {
//         console.log(error)

//     }
//     console.log("server");
// });
// app.get('/', (req, res) => {
//     res.send({ users: user });
// });
// app.post('/post', (req, res) => {
//     console.log(req.body)
//     user.push(req.body)
//     res.send({ users: user }).end();
//     console.log(user)
// });
// app.put('/:id', (req, res) => {
//     const id = req.params.id
//     user.map(users=>{
//         if (users.id ===  parseInt(id)) {
//             users.name = req.body.name
//         }         
//     });
//     res.send({ users: user });
// }); 
// app.delete('/:id', (req, res) => {
//     const id = req.params.id
//     const deleteId = user.findIndex((users) => users.id === parseInt(id))
//   if (deleteId !== -1 ) {
//     user.splice(deleteId, 1)
//   }
//     res.send({ users: user });
// });
import express from "express";
import bp from "body-parser";
import mongoose from "mongoose";
import { nanoid } from "nanoid";
import dotenv from 'dotenv'
import Url from './schema/Url.js'

dotenv.config()

const PORT = process.env.PORT || 8000;
const MONGODB_URL = process.env.MONGODB_URL

const app = express();
app.use(bp.json());

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