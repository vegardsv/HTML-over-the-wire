import express from "express";
import ws from "ws";
import mongodb from "mongodb";
import { html, body } from "./template.mjs";

const client = new mongodb.MongoClient(process.env.MONGO_DB_URI);
const wss = new ws.Server({ port: process.env.WEBSOCKET_PORT });
const app = express();
const query = { _id: new mongodb.ObjectID("60c5c60346bb1a323d422f5f") };

wss.on("connection", function connection(ws) {
  ws.on("message", async function incoming(message) {
    if (message === "increment") {
      await client.connect();
      const collection = client
        .db(process.env.DB_NAME)
        .collection("example-form");
      await collection.updateOne(query, { $inc: { counter: 1 } });
      const documentUpdated = await collection.findOne(query);
      ws.send(body(documentUpdated.counter));
    }
  });
});

app.get("/", async (req, res) => {
  await client.connect();
  const collection = client.db(process.env.DB_NAME).collection("example-form");
  const document = await collection.findOne(query);
  res.send(html(body(document.counter)));
});

app.listen(process.env.SERVER_PORT, () => {
  console.log(
    `Example app listening at http://localhost:${process.env.SERVER_PORT}`
  );
});
