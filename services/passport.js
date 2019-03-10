//give express idea of how to handle authentication
const passport = require("passport");
//instruct passport on exactly how to authenticate our users with Google Oauth
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const mongoose = require("mongoose");
const keys = require("../config/keys");

const User = mongoose.model("users"); //get model 'users'

//make token
passport.serializeUser((user, done) => {
  //id is assigned to the record by mongo
  done(null, user.id);
});

//turn id(token) into model instance of Mongoose
passport.deserializeUser((id, done) => {
  User.findById(id).then(user => {
    done(null, user);
  });
});
//https://console.developers.google.com
//Google+ API
// whenever we exchange the code for profile and whatever, Googlestrategy intends to call the callback function(accesstoken)
passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: "/auth/google/callback",
      proxy: true //trust the proxy
    },
    (accessToken, refreshToken, profile, done) => {
      //search to see if the id is already existed in the collection
      //whenever we make query to reach out to DB, it's an asynchronous operation
      // query returns promise
      User.findOne({ googleId: profile.id }).then(existingUser => {
        if (existingUser) {
          //we already have a record with the give profie id
          done(null, existingUser);
        } else {
          //we don't have a user record with this iD, make a new record
          new User({ googleId: profile.id })
            .save()
            .then(user => done(null, user));
        }
      });
    }
  )
);
