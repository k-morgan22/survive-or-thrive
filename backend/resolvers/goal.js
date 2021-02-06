const Goal = require('../models/goal')
const Area = require('../models/area')

const resolvers = {
  Query: {
    goals:  async () => {   
      const goals = await Goal.find()
      return goals
    },
    goal: async (_, args) => {
      const goal = await Goal.findById(args.id)
      return goal
    }
  },
  Mutation: {
    createGoal: async (parent, args) => {
      const goal = new Goal(args.goalInput);
      const createdGoal = await goal.save()
      const areaRecord = await Area.findById(args.goalInput.area)
      if(!areaRecord){
        throw new Error('Area not found.');
      }
      areaRecord.goals.push(goal)
      await areaRecord.save()
      return createdGoal
    }
    // deleteGoal: async (_, args) => {
    //   const toDelete = await Goal.findByIdAndRemove(args.id); 
    //   return toDelete
    // }
  },
  Goal: {
    area: async(args) => {
      const area = await Area.findById(args.area)
      return area
    }
  }
}


module.exports = resolvers