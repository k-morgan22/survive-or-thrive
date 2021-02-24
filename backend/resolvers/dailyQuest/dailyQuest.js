const DailyQuest = require('../../models/dailyQuest/dailyQuest')
const Attempt = require('../../models/dailyQuest/attempt')
const Habit = require('../../models/dailyQuest/habit')
const Entry = require('../../models/dailyQuest/entry')
const Reflection = require('../../models/dailyQuest/reflection')



const resolvers = {
  Query: {
    dailyQuests: async () => {   
      const dailyQuests = await DailyQuest.find()
      return dailyQuests
    },
    dailyQuest: async (_, args) => {
      const dailyQuest =  await DailyQuest.findById(args.id)
      return dailyQuest
    }
  },
  Mutation: {
    createDailyQuest: async (_, args) => {
      const dailyQuest = new DailyQuest(); 
      const createdDailyQuest = await dailyQuest.save()

      const currentHabits = await Habit.find()

      const toCreateA = []
      currentHabits.map( async (item) =>{
        const updatedItem = {
          title: item.title,
          isCompleted: false,
          habit: item.id,
          dailyQuest: createdDailyQuest.id 
        }
        toCreateA.push(updatedItem)
      })

      const createdAttempts = await Attempt.insertMany(toCreateA)

      createdAttempts.map(async (attempt) => {
        await Habit.updateOne({_id: attempt.habit},{
          $push: {
            attempts: attempt
          }
        })
      })

      const currentReflections = await Reflection.find()
      
      const toCreateE = []
      currentReflections.map(async (item) =>{
        const updatedItem = {
          title: item.title,
          isCompleted: false,
          reflection: item.id,
          dailyQuest: createdDailyQuest.id 
        }
        toCreateE.push(updatedItem)
      })

      const createdEntries = await Entry.insertMany(toCreateE)
      
      createdEntries.map(async (entry) => {
        await Reflection.updateOne({_id: entry.reflection},{
          $push: {
            entries: entry
          }
        })
      })

      await DailyQuest.updateOne({_id: createdDailyQuest.id},{
        $push: {
          dailyHabits: {
            $each: createdAttempts
          },
          dailyReflections: {
            $each: createdEntries
          }
        }
      })

      return createdDailyQuest
    },
    deleteDailyQuest: async (_, args) => {
      const dailyQuest = await DailyQuest.findById(args.id)

      await Habit.updateMany({},{
        $pull: {
          attempts: {$in: dailyQuest.dailyHabits}
        }
      })

      await Reflection.updateMany({},{
        $pull: {
          entries: {$in: dailyQuest.dailyReflections}
        }
      })

      //delete habit attempts linked to specific dailyQuest
      await Attempt.deleteMany({_id: {$in: dailyQuest.dailyHabits}})

      //delete reflection entries linked to specific dailyQuest
      await Entry.deleteMany({_id: {$in: dailyQuest.dailyReflections}})

      const deleted = await DailyQuest.findByIdAndDelete(args.id);

      return deleted
    }
  },
  DailyQuest: {
    displayDate: async(args) => {
      return args.createdAt.toLocaleString()
    },
    dailyHabits: async(args) => {
      const attempts = await Attempt.find({_id: {$in: args.dailyHabits}})
      return attempts
    },
    dailyReflections: async(args) => {
      const entries = await Entry.find({_id: {$in: args.dailyReflections}})
      return entries
    }
  }
}

module.exports = resolvers
