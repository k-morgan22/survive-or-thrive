const Reflection = require('../../models/dailyQuest/reflection')
const Entry = require('../../models/dailyQuest/entry')
const defaults = require('../../defaults/defaultReflections')
const DailyQuest = require('../../models/dailyQuest/dailyQuest')

const resolvers = {
  Query: {
    reflections: async () => {   
      const reflections = await Reflection.find()
      return reflections
    },
    reflection: async (_, args) => {
      const reflection =  await Reflection.findById(args.id)
      return reflection
    }
  },
  Mutation: {
    createReflection: async (_, args) => {
      const reflection = new Reflection(args.reflectionInput); 
      const createdReflection = await reflection.save()
      return createdReflection
    },
    deleteReflection: async (_, args) => {
      const reflection = await Reflection.findById(args.id)

      //delete reflection entries linked to specific reflection
      await Entry.deleteMany({_id: {$in: reflection.entries}})

      //delete all references to deleted entries in current and old DQs
      await DailyQuest.updateMany({},{
        $pull: {
          dailyReflections: {$in: reflection.entries}
        }
      })

      const deleted = await Reflection.findByIdAndDelete(args.id);
      return deleted
    },
    updateReflection: async (_, args) => {
      const updatedReflection = await Reflection.findByIdAndUpdate(args.id, args.reflectionInput, {new: true});

      if(args.reflectionInput.title){
        //find entry created today
        const startDay = new Date().setHours(0,0,0,0)
        const endDay = new Date().setHours(23,59,59,999)
        const createdToday = await Entry.findOne({createdAt: {$gte: startDay, $lt: endDay}, "reflection": updatedReflection.id})

        // update entry title
        await Entry.findByIdAndUpdate(createdToday.id, {title: updatedReflection.title}, {new: true});
      }

      return updatedReflection
    },
    initializeReflection: async() =>{
      const initialized = await Reflection.insertMany(defaults)
      return initialized
    }
  },
  Reflection: {
    entries: async(args) => {
      const entries = await Entry.find({_id: {$in: args.entries}})
      return entries
    }
  }
}


module.exports = resolvers
