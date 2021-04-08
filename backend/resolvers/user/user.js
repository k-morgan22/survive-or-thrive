const User = require('../../models/user/user');

const resolvers = {
  Query: {
    user: async (_, args) => {
      const user = await User.findById(args.id)
      return user
    },
    usernameExists: async (_, args) => {
      const usernameExists = await User.findOne({"username": args.username})
      if(usernameExists){
        return true
      } else {
        return false
      }
    },
    userByUsername: async (_, args) => {
      const user = await User.findOne({"username": args.username})
      return user
    }
  },
  Mutation: {
    createUser: async (_, args) => {

      const usernameExists = await User.findOne({"username": args.userInput.username})

      if(usernameExists){
        throw new Error('Username already exists, choose a new one.')
      }

      const user = new User(args.userInput)
      const createdUser = await user.save()
      return createdUser
    },
    deleteUser: async (_, args) => {
      const deleted = await User.findByIdAndDelete(args.id)
      return deleted
    },
    updateUser: async (_, args) => {
      const updatedUser = await User.findByIdAndUpdate(args.id, args.userInput, {new: true})
      return updatedUser
    }
  }
}

module.exports = resolvers