const Task = require('../../models/successPlan/task')
const Project = require('../../models/successPlan/project')


const resolvers = {
  Query: {
    tasks:  async () => {   
      const tasks = await Task.find()
      return tasks
    },
    task: async (_, args) => {
      const task = await Task.findById(args.id)
      return task
    }
  },
  Mutation: {
    createTask: async(_, args) => {
      const task = new Task(args.taskInput);
      const createdTask = await task.save()

      const projectRecord = await Project.findById(args.taskInput.project)
      if(!projectRecord){
        throw new Error('Project not found')
      }

      projectRecord.tasks.push(task)
      await projectRecord.save()
      return createdTask
    },
    deleteTask: async(_, args) => {
      const task = await Task.findById(args.id)
      const project = await Project.findById(task.project)

      if(!task){
        throw new Error('Task not found.');
      }

      const deletedTask = await Task.findByIdAndDelete(args.id)

      //update project collection
      project.tasks.pull(args.id)
      await project.save()

      return deletedTask
    },
    updateTask: async(_, args) => {
      const task = await Task.findById(args.id)

      if(!task){
        throw new Error('Task not found')
      }

      const updatedTask = await Task.findByIdAndUpdate(args.id, args.taskInput, {new: true});
      return updatedTask
    }
  },
  Task: {
    project: async(args) => {
      const project = await Project.findById(args.project)
      return project
    }
  }
}


module.exports = resolvers