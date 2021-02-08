const mongoose = require('mongoose')

const milestoneSchema = new mongoose.Schema({ 
  title: String,
  description: String,
  status: String,
  impact: String,
  targetDate: String,
  goal: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Goal"
  }
});

module.exports = mongoose.model('Milestone', milestoneSchema);