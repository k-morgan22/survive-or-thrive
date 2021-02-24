const Habit = require('../../models/dailyQuest/habit')
const Attempt = require('../../models/dailyQuest/attempt')
const defaults = require('../../defaults/defaultHabits')
const DailyQuest = require('../../models/dailyQuest/dailyQuest')

const resolvers = {
  Query: {
    habits: async () => {   
      const habits = await Habit.find()
      return habits
    },
    habit: async (_, args) => {
      const habit =  await Habit.findById(args.id)
      return habit
    }
  },
  Mutation: {
    createHabit: async (_, args) => {
      const habit = new Habit(args.habitInput); 
      const createdHabit = await habit.save()
      return createdHabit
    },
    deleteHabit: async (_, args) => {
      const habit = await Habit.findById(args.id)

      //delete habit attempts linked to specific habit
      await Attempt.deleteMany({_id: {$in: habit.attempts}})

      //delete all references to deleted attempts in current and old DQs
      await DailyQuest.updateMany({},{
        $pull: {
          dailyHabits: {$in: habit.attempts}
        }
      })

      const deleted = await Habit.findByIdAndDelete(args.id);
      return deleted
    },
    updateHabit: async (_, args) => {
      const updatedHabit = await Habit.findByIdAndUpdate(args.id, args.habitInput, {new: true});

      if(args.habitInput.title){
        //find attempt created today
        const startDay = new Date().setHours(0,0,0,0)
        const endDay = new Date().setHours(23,59,59,999)
        const createdToday = await Attempt.findOne({createdAt: {$gte: startDay, $lt: endDay}, "habit": updatedHabit.id})

        // update attempt title
        await Attempt.findByIdAndUpdate(createdToday.id, {title: updatedHabit.title}, {new: true});
      }

      return updatedHabit
    },
    initializeHabit: async() =>{
      const initialized = await Habit.insertMany(defaults)
      return initialized
    }
  },
  Habit: {
    attempts: async(args) => {
      const attempts = await Attempt.find({_id: {$in: args.attempts}})
      return attempts
    }
  }
}


module.exports = resolvers
