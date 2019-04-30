const mongoose = require("mongoose");
const PLM = require("passport-local-mongoose");

const clientSchema = new mongoose.Schema(
  {
    name: String,
    email: String,
    role: {
      type: String,
      enum: ["Standard", "Pro"],
      default: "Standard"
    },
    sector: String,
    company: String
  },
  {
    timestamps: true,
    versionKey: false
  }
);

clientSchema.plugin(PLM, { usernameField: "email" });

module.exports = mongoose.model("Client", clientSchema);
