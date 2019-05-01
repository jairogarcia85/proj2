const mongoose = require("mongoose");
const PLM = require("passport-local-mongoose");

const commentSchema = new mongoose.Schema(
  {
    username: String,
    content : String,
    created : Date
  }
)