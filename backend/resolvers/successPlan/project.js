const Project = require('../../models/successPlan/project')
const Milestone = require('../../models/successPlan/milestone')
const Task = require('../../models/successPlan/task')


const resolvers = {
  Query: {
    projects:  async () => {   
      const projects = await Project.find()
      return projects
    },
    project: async (_, args) => {
      const project = await Project.findById(args.id)
      return project
    }
  },
  Mutation: {
    createProject: async(_, args) => {
      const project = new Project(args.projectInput);
      const createdProject = await project.save()

      await Milestone.updateOne({_id: createdProject.milestone},{
        $push: {
          projects: createdProject
        }
      })

      return createdProject
    },
    deleteProject: async(_, args) => {
      const project = await Project.findById(args.id)

      if(!project){
        throw new Error('Project not found.');
      }

      //delete tasks linked to specific project
      await Task.deleteMany({_id: {$in: project.tasks}})

      const deletedProject = await Project.findByIdAndDelete(args.id)

      //update milestone collection
      await Milestone.updateOne({_id: deletedProject.milestone},{
        $pull: {
          projects: deletedProject.id
        }
      })

      return deletedProject
    },
    updateProject: async(_, args) => {
      const project = await Project.findById(args.id)

      if(!project){
        throw new Error('Project not found')
      }

      const updatedProject = await Project.findByIdAndUpdate(args.id, args.projectInput, {new: true});
      return updatedProject
    }
  },
  Project: {
    milestone: async(args) => {
      const milestone = await Milestone.findById(args.milestone)
      return milestone
    },
    tasks: async(args) => {
      const tasks = await Task.find({_id: {$in: args.tasks}})
      return tasks
    }
  }
}


module.exports = resolvers