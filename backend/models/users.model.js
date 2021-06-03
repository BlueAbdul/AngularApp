const mongoose = require("mongoose");
const { stringify } = require("uuid");

let UserSchema = mongoose.Schema(
  {
    _id: String,
    username: String,
    password : String,
    ips: Array,
    role : String
  },
  { collection: "_users" }
);

let Users = mongoose.model("Schema", UserSchema);

module.exports = Users;
