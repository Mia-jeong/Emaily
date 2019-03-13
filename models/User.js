const mongoose = require("mongoose");
const { Schema } = mongoose;

//make Model (which automatically make collection in MongoDB)
const userSchema = new Schema({
  googleId: String,
  credits: { type: Number, default: 0 }
});

mongoose.model("users", userSchema);
