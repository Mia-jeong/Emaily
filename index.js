//we're using common js modules
// use require to access to express modules = import express from 'express';
const express = require("express");
const mongoose = require("mongoose");
const cookieSession = require("cookie-session");
const passport = require("passport");
const keys = require("./config/keys");
require("./models/User"); //make user collection, you should do it in order.
require("./services/passport");

const app = express();

app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [keys.cookieKey]
  })
);

app.use(passport.initialize());
app.use(passport.session());

// Route handler example
// app.get("/", (req, res) => {
//   res.send({ bye: "buddy" });
// });

// const authRoutes = require("./routes/authRoutes");
require("./routes/authRoutes")(app);

mongoose.connect(keys.mongoURI);
//heroku gives us enviroment variable when it's deployed ,for default (dev enviroment ) add 5000 to the end
const PORT = process.env.PORT || 5000;
app.listen(PORT);

//
//npm install --save express
//npm install --passport
//npm install --save passport passport-google-oauth20          >http://www.passportjs.org/
//npm install --save nodemon    >automatically restart our server anytime we change any file inside of it
/*
  "scripts": {
    "start": "node index.js",
    "dev": "nodemon index.js"  << add this one to scripts inside of package.json
  }

  and start server
  npm run dev
*/

//npm install --save mongoose
//npm install --save cookie-session
//npm install passport-google-oauth20@2 --save
