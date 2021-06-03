const mongoose = require("mongoose");

let TaskSchema = mongoose.Schema(
  {
    referent : String,
    title : String,
    content : String,
    date : Date,
    status : String
  },
  { collection: "_tasks" }
);

let Tasks = mongoose.model("Tasks", TaskSchema);

module.exports = Tasks;
