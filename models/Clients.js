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
    sector: {
      //liga al ticket con el user
      type: String,
      enum: ["area1", "area2", "area3", "area4"],
      default: "area1"
    },

    company: String //liga al ticket con el client
  },
  {
    timestamps: true,
    versionKey: false
  }
);

clientSchema.plugin(PLM, { usernameField: "email" });

module.exports = mongoose.model("Client", clientSchema);
