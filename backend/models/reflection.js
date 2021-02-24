const mongoose = require('mongoose')

const reflectionSchema = new mongoose.Schema({
  title: String,
  description: String,
  entries: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Entry"
  }]
})

module.exports = mongoose.model('Reflection', reflectionSchema);