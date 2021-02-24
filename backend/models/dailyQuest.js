const mongoose = require('mongoose')

const dailyQuestSchema = new mongoose.Schema({
  createdAt: {
    type: Date,
    default: Date.now
  },
  dailyHabits: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Attempt"
  }],
  dailyReflections: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Entry"
  }]
});

module.exports = mongoose.model('DailyQuest', dailyQuestSchema);