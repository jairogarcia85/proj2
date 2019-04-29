const mongoose = require("mongoose");
const PLM = require("passport-local-mongoose");

const userSchema = new mongoose.Schema(
  {
    email: String,
    type: {
      type: String,
      enum: ["Standar", "Pro"],
      default: "Standar"
    },
    sector: String,
    company: String
  },
  {
    timestamps: true,
    versionKey: false
  }
);
//se agrega el plugin de PLM
userSchema.plugin(PLM, { usernameField: "email" });

module.exports = mongoose.model("User", userSchema);
