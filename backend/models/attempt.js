const mongoose = require('mongoose')

const attemptSchema = new mongoose.Schema({
  title: String,
  note: String, 
  isCompleted: Boolean,
  createdAt: {
    type: Date,
    default: Date.now
  },
  habit: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Habit"
  },
  dailyQuest: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "DailyQuest"
  }
});

module.exports = mongoose.model('Attempt', attemptSchema)