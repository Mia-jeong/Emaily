const passport = require("passport");

//GoogleStrategy has internal identifier as 'google', so when you put 'google' as an argument, it means you're going to use GoogleStrategy
module.exports = app => {
  app.get(
    "/auth/google",
    passport.authenticate("google", {
      scope: ["profile", "email"]
    })
  );

  app.get(
    "/auth/google/callback",
    passport.authenticate("google"), //it's actually middleware, after it's executed, it doesn't know what to do
    (req, res) => {
      res.redirect("/surveys");
    }
  );

  app.get("/api/logout", (req, res) => {
    req.logout();
    res.redirect("/");
  });

  app.get("/api/current_user", (req, res) => {
    //res.send(req.session);
    res.send(req.user);
  });
};
