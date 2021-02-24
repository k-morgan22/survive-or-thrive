const Goal = require('../../models/successPlan/goal')
const Area = require('../../models/successPlan/area')
const Milestone = require('../../models/successPlan/milestone')

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

      //delete milestones linked to specific goal
      await Milestone.deleteMany({_id: {$in: goal.milestones}})

      // delete from goal collection
      const deletedGoal = await Goal.findByIdAndDelete(args.id); 

      //update area collection
      area.goals.pull(args.id)
      await area.save()

      return deletedGoal
    },
    updateGoal: async (_, args) => {
      const goal = await Goal.findById(args.id)
      
      if(!goal){
        throw new Error('Goal not found.');
      }

      const updatedGoal = await Goal.findByIdAndUpdate(args.id, args.goalInput, {new: true}); 
      return updatedGoal
    }
  },
  Goal: {
    area: async(args) => {
      const area = await Area.findById(args.area)
      return area
    },
    milestones: async(args) => {
      const goal = await Goal.findById(args.id)
      return await goal.milestones.map(async(milestone) => await Milestone.findById(milestone) )
    }
  }
}


module.exports = resolvers