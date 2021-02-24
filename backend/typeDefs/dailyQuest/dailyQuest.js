const { gql } = require('apollo-server')

module.exports = gql`
  type DailyQuest {
    id: ID!
    dailyHabits: [Attempt!]
    dailyReflections: [Entry!]
    createdAt: DateTime!
    displayDate: String!
  }

  type Query {
    dailyQuests: [DailyQuest!]
    dailyQuest(id: ID!): DailyQuest
  }


  type Mutation{
    createDailyQuest: DailyQuest
    deleteDailyQuest(id: ID!): DailyQuest
  }

`