const mongoose = require('mongoose')

const projectSchema = new mongoose.Schema({ 
  title: String,
  description: String,
  status: String,
  impact: String,
  targetDate: String,
  milestone: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Milestone"
  },
  tasks: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Task"
  }]
});

module.exports = mongoose.model('Project', projectSchema);