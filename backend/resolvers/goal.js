const Goal = require('../models/goal')
const Area = require('../models/area')

const resolvers = {
  Query: {
    goals:  async () => {   
      const goals = await Goal.find().populate('area')
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
      return {
        ...createdGoal._doc,
        id: createdGoal._doc._id.toString()
      }
    }
    // deleteGoal: async (_, args) => {
    //   const toDelete = await Goal.findByIdAndRemove(args.id); 
    //   return toDelete
    // }
  }
}


module.exports = resolvers