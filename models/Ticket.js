const mongoose = require("mongoose");

const ticketSchema = new mongoose.Schema({
  title: String,
  area: String,
  description: String,
  number: {
    type: Number,
    default: Date.now
  },
  status: {
    type: String,
    enum: ["Open", "Close"],
    default: "Open"
  },
  sector: {
    //liga al ticket con el user
    type: String,
    enum: ["area1", "area2", "area3", "area4"],
    default: 'area1'
  },
  company: String //liga al ticket con el client
});

// const Ticket = mongoose.model('Ticket', ticketSchema)
// mongoose.connect('mongodb://localhost/test').then(()=>{
//   const ticket = new Ticket({title: 'Starbucks', area: 'Coffee Shop', description: 'Cafe'})
//   console.log('hola', ticket)
//   ticket.save()
// })

module.exports = mongoose.model("Ticket", ticketSchema);
