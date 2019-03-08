//we're using common js modules
// use require to access to express modules = import express from 'express';
const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.send({ hi: "there" });
});

//heroku gives us enviroment variable when it's deployed ,for default (dev enviroment ) add 5000 to the end
const PORT = process.env.PORT || 5000;
app.listen(PORT);
