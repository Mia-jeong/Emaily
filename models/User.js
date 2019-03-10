const mongoose = require("mongoose");
const { Schema } = mongoose;

//make Model (which automatically make collection in MongoDB)
const userSchema = new Schema({
  googleId: String
});

mongoose.model("users", userSchema);
