require("dotenv").config();
const express = require("express");
const app = express();

app.post("/post", (req, res) => {
  console.log("Connected to react");
  res.redirect("/");
});

app.listen(5000, () => {
  console.log("listening on port 5000");
});
