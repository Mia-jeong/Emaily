const keys = require("../config/keys");
const stripe = require("stripe")(keys.stripeSecretKey);
const requireLogin = require("../middlewares/requireLogin"); //middleware

module.exports = app => {
  app.post("/api/stripe", requireLogin, async (req, res) => {
    //create the actual charges
    const charge = await stripe.charges.create({
      amount: 500,
      currency: "usd",
      description: "$5 for 5 credits",
      source: req.body.id
    });

    req.user.credits += 5;
    const user = await req.user.save();
    res.send(user);
  });
};

//documentation
//https://stripe.com/docs/api/balance/balance_transaction_retrieve?lang=node
