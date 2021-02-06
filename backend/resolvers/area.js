const Area = require('../models/area')
const Goal = require('../models/goal')

const resolvers = {
  Query: {
    areas: async () => {   
      const areas = await Area.find()
      return areas
    },
    area: async (_, args) => {
      const area =  await Area.findById(args.id)
      return area
    }
  },
  Mutation: {
    createArea: async (_, args) => {
      const area = new Area(args.areaInput); 
      const createdArea = await area.save()
      return createdArea
    },
    deleteArea: async (_, args) => {
      const toDelete = await Area.findByIdAndRemove(args.id);
      return toDelete
    },
    updateArea: async (_, args) => {
      const updatedArea = await Area.findByIdAndUpdate(args.id, args.areaInput, {new: true});
      return updatedArea
    }
  },
  Area: {
    goals: async(args) => {
      const area = await Area.findById(args.id)
      return await area.goals.map(async (goal) => await Goal.findById(goal))
    }
  }
}


module.exports = resolvers
