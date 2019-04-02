//we're using common js modules
// use require to access to express modules = import express from 'express';
const express = require("express");
const mongoose = require("mongoose");
const cookieSession = require("cookie-session");
const passport = require("passport");
const bodyParser = require("body-parser");
const keys = require("./config/keys");
require("./models/User"); //make user collection, you should do it in order.
require("./models/Survey");
require("./services/passport");

const app = express();

////////////////////middle ware

// Now any time a post request or a put request or a patch request or anything else that has a request
// a body comes into our application this middleware right here will parse the body and then assign it
// to the req.body property of the incoming request object.

app.use(bodyParser.json());

app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [keys.cookieKey]
  })
);

app.use(passport.initialize());
app.use(passport.session());

////////////////////middle ware
// Route handler example
// app.get("/", (req, res) => {
//   res.send({ bye: "buddy" });
// });

// const authRoutes = require("./routes/authRoutes");
require("./routes/authRoutes")(app);
require("./routes/billingRoutes")(app);
require("./routes/surveyRoutes")(app);

if (process.env.NODE_ENV === "production") {
  //Express will serve up production assets
  //like our main.js file, or main.cs file!

  // So this first line right here says if any get request comes in for some routes or some file or absolutely
  // anything to our application and we do not understand what it's looking for.
  // Like if we do not already have a route handler set up for this thing then look into the client/build
  app.use(express.static("client/build"));

  //Express will serve up the index.html file
  //if it doesn't recognize  the route

  const path = require("path");
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

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
//npm install --save concurrently
//npm install --save stripe
//npm install --save body-parser
//npm install --save sendgrid
