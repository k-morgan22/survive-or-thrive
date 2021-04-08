const Ranges = require('./ranges')


function calculateExp(base, difficulty){
  const exp = base * difficulty
  return exp 
}

function calculateGold(base, difficulty){
  const gold = base * difficulty
  return gold
}

function calculateHp(type, difficulty){
  const hp = type * difficulty
  return hp
}

function generateBaseExp(type){
  let min;
  let max;
  const keys = Object.keys(Ranges)  

  keys.forEach((key) => {
    if(key == type){
      min = Ranges[key].expMin
      max = Ranges[key].expMax
    }
  });

  return Math.floor(Math.random() * (max - min)) + min
}

function generateBaseGold(type){
  let min;
  let max;
  const keys = Object.keys(Ranges)  

  keys.forEach((key) => {
    if(key == type){
      min = Ranges[key].goldMin
      max = Ranges[key].goldMax
    }
  });

  return Math.floor(Math.random() * (max - min)) + min
}

function calculateNextLvl(lvl){
  
  const starterExp = 50
  const exponent = 2
  const nextLvl = Math.floor(starterExp * (lvl** exponent) )

  return nextLvl
}

module.exports = {
  calculateExp: calculateExp,
  calculateGold: calculateGold,
  calculateHp: calculateHp,
  generateBaseExp: generateBaseExp,
  generateBaseGold: generateBaseGold,
  calculateNextLvl: calculateNextLvl
};