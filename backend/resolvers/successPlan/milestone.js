const Milestone = require('../../models/successPlan/milestone')
const Goal = require('../../models/successPlan/goal')
const Project = require('../../models/successPlan/project')


const resolvers = {
  Query: {
    milestones:  async () => {   
      const milestones = await Milestone.find()
      return milestones
    },
    milestone: async (_, args) => {
      const milestone = await Milestone.findById(args.id)
      return milestone
    }
  },
  Mutation: {
    createMilestone: async(_, args) => {
      const milestone = new Milestone(args.milestoneInput);
      const createdMilestone = await milestone.save()

      await Goal.updateOne({_id: createdMilestone.goal},{
        $push: {
          milestones: createdMilestone
        }
      })

      return createdMilestone
    },
    deleteMilestone: async(_, args) => {
      const milestone = await Milestone.findById(args.id)

      if(!milestone){
        throw new Error('Milestone not found.');
      }

      //delete projects linked to specific milestone
      await Project.deleteMany({_id: {$in: milestone.projects}})

      const deletedMilestone = await Milestone.findByIdAndDelete(args.id)

      //update goal collection
      await Goal.updateOne({_id: deletedMilestone.goal},{
        $pull: {
          milestones: deletedMilestone.id
        }
      })

      return deletedMilestone
    },
    updateMilestone: async(_, args) => {
      const milestone = await Milestone.findById(args.id)

      if(!milestone){
        throw new Error('Milestone not found')
      }

      const updatedMilestone = await Milestone.findByIdAndUpdate(args.id, args.milestoneInput, {new: true});
      return updatedMilestone
    }
  },
  Milestone: {
    goal: async(args) => {
      const goal = await Goal.findById(args.goal)
      return goal
    },
    projects: async(args) => {
      const projects = await Project.find({_id: {$in: args.projects}})
      return projects
    }
  }
}


module.exports = resolvers