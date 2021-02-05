const mongoose = require('mongoose')

const areaSchema = new mongoose.Schema({ 
  title: String,
  summary: String,
  goals: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Goal"
  }]
});

module.exports = mongoose.model('Area', areaSchema);