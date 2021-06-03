const mongoose = require("mongoose");

let tokenSchema = mongoose.Schema(
  {
    token: String,
    userID: String,
    date : { type: Date, default: Date.now }
  },
  { collection: "_api.token" }
);

let ApiToken = mongoose.model("ApiToken", tokenSchema);

module.exports = ApiToken;
