const Attempt = require('../../models/dailyQuest/attempt')
const Habit = require('../../models/dailyQuest/habit')
const DailyQuest = require('../../models/dailyQuest/dailyQuest')

const resolvers = {
  Query: {
    attempts:  async () => {   
      const attempts = await Attempt.find()
      return attempts
    },
    attempt: async (_, args) => {
      const attempt = await Attempt.findById(args.id)
      return attempt
    }
  },
  Mutation: {
    updateAttempt: async (_, args) => {
      const attempt = await Attempt.findById(args.id)
      
      if(!attempt){
        throw new Error('Attempt not found.');
      }

      const updatedAttempt = await Attempt.findByIdAndUpdate(args.id, args.attemptInput, {new: true}); 
      return updatedAttempt
    },
    toggleAttemptCompleted: async(_, args) => {
      const attempt = await Attempt.findById(args.id)

      if(!attempt){
        throw new Error('Attempt not found.');
      }
      
      const toggledAttempt = await Attempt.findByIdAndUpdate(args.id, { isCompleted: !attempt.isCompleted}, {new: true}); 
      return toggledAttempt
    }
  },
  Attempt: {
    habit: async(args) => {
      const habit = await Habit.findById(args.habit)
      return habit
    },
    dailyQuest: async(args) => {
      const dailyQuest = await DailyQuest.findById(args.dailyQuest)
      return dailyQuest
    }
  }
}


module.exports = resolvers