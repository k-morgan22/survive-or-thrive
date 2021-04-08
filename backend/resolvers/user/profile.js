const User = require('../../models/user/user');
const Profile = require('../../models/user/profile');
const { calculateExp, calculateGold, calculateHp, generateBaseExp, generateBaseGold, calculateNextLvl } = require('../../defaults/formulas')


const resolvers = {
  Query: {
    profile: async (_, args) => {
      const profile = await Profile.findById(args.id)
      return profile 
    },
    profileByUsername: async (_, args) => {
      const profile = await Profile.findOne({"username": args.username})
      return profile
    }
  },
  Mutation: {
    createProfile: async (_, args) => {
      const user = await User.findById(args.profileInput.user)
      const profile = new Profile (
        {
          name: user.username,
          profileImage: args.profileInput.profileImage || "exampleImage.png" ,
          level: 1,
          exp: 0,
          nextLevel: 50,
          hp: 100,
          gold: 0,
          user: args.profileInput.user
        }
      )
      const createdProfile = await profile.save()
      return createdProfile
    },
    deleteProfile: async (_,args) => {
      const deleted = await Profile.findByIdAndDelete(args.id)
      return deleted
    },
    updateProfile: async (_, args) => {
      const updated = await Profile.findByIdAndUpdate(args.id, args.profileInput, {new: true})
      return updated
    },
    increaseExp: async (_, args) => {
      const baseExp = generateBaseExp(args.type)

      const increase = calculateExp(baseExp, args.difficulty)

      const updated = await Profile.findByIdAndUpdate(args.id, { $inc: {"exp": increase}}, {new: true})

      //triggering level up. once i design the ui I can use apollo hooks instead of hack below
      if(updated.exp >= updated.nextLevel){
        let triggerLevelUp = true
        while (triggerLevelUp == true) {
          const profile = await Profile.findById(args.id)
          const nextLevel = calculateNextLvl(profile.level + 1)
    
          const levelUp = await Profile.findByIdAndUpdate(
            args.id, 
            { 
              $inc: {"level": 1},
              "nextLevel": nextLevel
            }, 
            {new: true}
          )
          if(levelUp.exp < levelUp.nextLevel){
            triggerLevelUp = false
            return levelUp
          }
        } //end of while statement
      } else{
        return updated
      }

    },
    increaseGold: async(_, args) =>{
      const baseExp = generateBaseGold(args.type)

      const increase = calculateGold(baseExp, args.difficulty)

      const updated = await Profile.findByIdAndUpdate(args.id, { $inc: {"gold": increase}}, {new: true})
      return updated
    },
    decreaseHp: async(_, args) =>{
      let type;

      if(args.type == "smallTask"){
        type = 2
      }else if (args.type == "bigTask") {
        type = 4
      }else if (args.type == "project") {
        type = 6
      }else if (args.type == "milestone"){
        type = 8
      }else if (args.type == "goal") {
        type = 10
      }

      const decrease = - (calculateHp(type, args.difficulty))

      const updated = await Profile.findByIdAndUpdate(args.id, { $inc: {"hp": decrease}}, {new: true})
  
      //generate badge and push badge to profile? need to add functionality

      if(updated.hp <= 0){
        const profile = await Profile.findById(args.id)
        const nextLevel = calculateNextLvl(profile.level - 1)

        const levelDown = await Profile.findByIdAndUpdate(
          args.id, 
          { 
            $inc: {"level": - 1},
            "exp": nextLevel * 0.5,
            "nextLevel": nextLevel,
            "hp": 100
          }, 
          {new: true}
        )

        return levelDown
      } else {
        return updated
      }
      
    },                
    levelUp: async(_, args) => {
      //update with while statement 
      const profile = await Profile.findById(args.id)
      const nextLevel = calculateNextLvl(profile.level + 1)

      const levelUp = await Profile.findByIdAndUpdate(
        args.id, 
        { 
          $inc: {"level": 1},
          "nextLevel": nextLevel
        }, 
        {new: true}
      )
      return levelUp
    },
    levelDown: async(_, args) => {
      const profile = await Profile.findById(args.id)
      const nextLevel = calculateNextLvl(profile.level - 1)

      const levelDown = await Profile.findByIdAndUpdate(
        args.id, 
        { 
          $inc: {"level": - 1},
          "exp": nextLevel * 0.5,
          "nextLevel": nextLevel,
          "hp": 100
        }, 
        {new: true}
      )
      return levelDown
    }

  },
  Profile: {
    nextLevelBar: async(args) => {

      let barView = ''
      let percentage = Math.floor((args.exp/args.nextLevel)*10)
      
      for (let i = 0; i < percentage; i++) {
          barView +=  '⭐'
      }

      for (let i = percentage; i < 10; i++) {
          barView += '✩'
      }

      barView += " " + args.nextLevel

      return barView
    },
    hpBar: async(args) => {
      let barView = ''

      //for now max hp is hardcoded as one hundred, in the future will add var
      let percentage = Math.floor((args.hp/100)*10)

      if(percentage <= 2){
        for (let i = 0; i < percentage; i++) {
          barView += '❤️'
        }
      } else if(percentage <= 5 ){
        for (let i = 0; i < percentage; i++) {
          barView += '💛'
        }
      } else{
        for (let i = 0; i < percentage; i++) {
          barView +=  '💚'
        }
      }

      for (let i = percentage; i < 10; i++) {
          barView += '➖'
      }

      barView += " " + args.hp + "/100"

      return barView
    }

  }
}

module.exports = resolvers