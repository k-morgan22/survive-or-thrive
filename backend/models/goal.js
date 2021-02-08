const mongoose = require('mongoose')

const goalSchema = new mongoose.Schema({ 
  title: String,
  description: String,
  status: String,
  impact: String,
  targetDate: String,
  area: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Area"
  },
  milestones: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Milestone"
  }]

});

module.exports = mongoose.model('Goal', goalSchema);