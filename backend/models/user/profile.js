const mongoose = require('mongoose')

const profileSchema = new mongoose.Schema({
  name: String,
  profileImage: String,
  level: Number, 
  exp: Number,
  nextLevel: Number,
  nextLevelBar: String,
  hp: Number,
  hpBar: String,
  gold: Number,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  }
});

module.exports = mongoose.model('Profile', profileSchema)