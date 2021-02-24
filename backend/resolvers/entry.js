const Entry = require('../models/entry')
const Reflection = require('../models/reflection')
const DailyQuest = require('../models/dailyQuest')

const resolvers = {
  Query: {
    entries:  async () => {   
      const entries = await Entry.find()
      return entries
    },
    entry: async (_, args) => {
      const entry = await Entry.findById(args.id)
      return entry
    }
  },
  Mutation: {
    updateEntry: async (_, args) => {
      const entry = await Entry.findById(args.id)
      
      if(!entry){
        throw new Error('Entry not found.');
      }

      const updatedEntry = await Entry.findByIdAndUpdate(args.id, args.entryInput, {new: true}); 
      return updatedEntry
    },
    toggleEntryCompleted: async(_, args) => {
      const entry = await Entry.findById(args.id)
      
      if(!entry){
        throw new Error('Entry not found.');
      }

      const toggledEntry = await Entry.findByIdAndUpdate(args.id, { isCompleted: !entry.isCompleted}, {new: true}); 
      return toggledEntry
    }
  },
  Entry: {
    reflection: async(args) => {
      const reflection = await Reflection.findById(args.reflection)
      return reflection
    },
    dailyQuest: async(args) => {
      const dailyQuest = await DailyQuest.findById(args.dailyQuest)
      return dailyQuest
    }
  }
}


module.exports = resolvers