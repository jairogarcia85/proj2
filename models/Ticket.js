const mongoose = require("mongoose");

const ticketSchema = new mongoose.Schema({
  title: String,
  description: String,
  userComment: [String],
  clientComment: {
    clientname: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Client"
    },
    content: String,
    date: Date
  },

  number: {
    type: Number,
    default: Date.now
  },
  status: {
    type: String,
    enum: ["Open", "Pending", "Closed"],
    default: "Open"
  },
  company: String //liga al ticket con el client
});

module.exports = mongoose.model("Ticket", ticketSchema);
