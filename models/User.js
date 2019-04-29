const mongoose = require("mongoose");
const PLM = require("passport-local-mongoose");

const userSchema = new mongoose.Schema(
  {
    name: String,
    email: String,
    role: {
      type: String,
      enum: ["Admin", "User", "Client"],
      default: "Client"
    },
    status: {
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

userSchema.plugin(PLM, { usernameField: "email" });

module.exports = mongoose.model("User", userSchema);
