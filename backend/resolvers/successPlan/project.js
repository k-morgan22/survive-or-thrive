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

      const milestoneRecord = await Milestone.findById(args.projectInput.milestone)
      if(!milestoneRecord){
        throw new Error('Milestone not found')
      }

      milestoneRecord.projects.push(project)
      await milestoneRecord.save()
      return createdProject
    },
    deleteProject: async(_, args) => {
      const project = await Project.findById(args.id)
      const milestone = await Milestone.findById(project.milestone)

      if(!project){
        throw new Error('Project not found.');
      }

      //delete tasks linked to specific project
      await Task.deleteMany({_id: {$in: project.tasks}})

      const deletedProject = await Project.findByIdAndDelete(args.id)

      //update milestone collection
      milestone.projects.pull(args.id)
      await milestone.save()

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
      const project = await Project.findById(args.id)
      return await project.tasks.map(async(task) => await Task.findById(task))
    }
  }
}


module.exports = resolvers