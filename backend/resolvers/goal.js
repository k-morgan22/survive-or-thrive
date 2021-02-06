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
    createGoal: async (_, args) => {
      const goal = new Goal(args.goalInput);
      const createdGoal = await goal.save()
      const areaRecord = await Area.findById(args.goalInput.area)
      if(!areaRecord){
        throw new Error('Area not found.');
      }
      areaRecord.goals.push(goal)
      await areaRecord.save()
      return createdGoal
    },
    deleteGoal: async (_, args) => {
      const goal = await Goal.findById(args.id)
      const area = await Area.findById(goal.area)

      if(!goal){
        throw new Error('Goal not found.');
      }
      // delete from goal collection
      const deleted = await Goal.findByIdAndDelete(args.id); 

      //update area collection
      area.goals.pull(args.id)
      await area.save()

      return deleted
    }
  },
  Goal: {
    area: async(args) => {
      const area = await Area.findById(args.area)
      return area
    }
  }
}


module.exports = resolvers