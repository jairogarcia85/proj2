const mongoose = require("mongoose");
const PLM = require("passport-local-mongoose");

const userSchema = new mongoose.Schema(
  {
    name: String,
    email: String,
    role: {
      type: String,
      enum: ["Admin", "User", "Client"],
      default: "User"
    },
    status: {
      type: String,
      enum: ["Standard", "Pro"],
      default: "Standard"
    },
    company: String, //liga al ticket con el client
    ticket: [{ type: mongoose.Schema.Types.ObjectId, ref: "Ticket" }]
  },

  {
    timestamps: true,
    versionKey: false
  }
);

userSchema.plugin(PLM, { usernameField: "email" });

module.exports = mongoose.model("User", userSchema);
