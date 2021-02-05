const Area = require('../models/area')
const Goal = require('../models/goal')

const resolvers = {
  Query: {
    areas: async () => {   
      const areas = await Area.find().populate('goals')
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
      return {
        ...createdArea._doc,
        id: createdArea._doc._id.toString()
      }
    },
    deleteArea: async (_, args) => {
      const toDelete = await Area.findByIdAndRemove(args.id);
      return toDelete
    },
    updateArea: async (_, args) => {
      const updatedArea = await Area.findByIdAndUpdate(args.id, args.areaInput, {new: true});
      return updatedArea
    }
  }
}


module.exports = resolvers
