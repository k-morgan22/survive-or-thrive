const mongoose = require('mongoose')

const entrySchema = new mongoose.Schema({
  title: String,
  body: String, 
  isCompleted: Boolean,
  createdAt: {
    type: Date,
    default: Date.now
  },
  reflection: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Reflection"
  },
  dailyQuest: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "DailyQuest"
  }
});

module.exports = mongoose.model('Entry', entrySchema)