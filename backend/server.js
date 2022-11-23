const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const txtgen = require("txtgen/dist/cjs/txtgen.js");
const port = 8080;

// We are using our packages here
app.use(bodyParser.json()); // to support JSON-encoded bodies

app.use(
  bodyParser.urlencoded({
    // to support URL-encoded bodies
    extended: true,
  })
);
app.use(cors());

//You can use this to check if your server is working
app.get("/", (req, res) => {
  res.send("Welcome to your server");
});

//route that grabs a random paragraph from https://unpkg.com/txtgen@3.0.4/dist/txtgen.min.js
app.get("/paragraph", (req, res) => {
  const paragraph = txtgen.paragraph();

  res.send(paragraph);
});

//Start your server on a specified port
app.listen(port, () => {
  console.log(`Server is runing on port ${port}`);
});
