const mongoose = require('mongoose')

const habitSchema = new mongoose.Schema({
  title: String, 
  description: String,
  attempts: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Attempt"
  }]
})

module.exports = mongoose.model('Habit', habitSchema)