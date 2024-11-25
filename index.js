const express = require("express");
const { readFile } = require("fs").promises;
const path = require("path");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 3000;

app.get("/", async (request, response) => {
  const html = await readFile("./app/views/home.html", "utf8");
  response.send(html);
  try {
  } catch (err) {
    response.status(500).send("Sorry, out of order");
  }
});

app.listen(port, () =>

  console.log(`App available on http://localhost:${port}`)
);
