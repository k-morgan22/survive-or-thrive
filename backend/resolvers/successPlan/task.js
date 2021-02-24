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

      await Project.updateOne({_id: createdTask.project},{
        $push: {
          tasks: createdTask
        }
      })

      return createdTask
    },
    deleteTask: async(_, args) => {
      const task = await Task.findById(args.id)

      if(!task){
        throw new Error('Task not found.');
      }

      const deletedTask = await Task.findByIdAndDelete(args.id)

      //update project collection
      await Project.updateOne({_id: deletedTask.project},{
        $pull: {
          tasks: deletedTask.id
        }
      })

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