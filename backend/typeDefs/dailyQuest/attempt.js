const { gql } = require('apollo-server')

module.exports = gql`
  type Attempt {
    id: ID!
    title: String!
    note: String
    isCompleted: Boolean!
    createdAt: DateTime!
    habit: Habit!
    dailyQuest: DailyQuest!
  }

  input AttemptUpdateInput {
    note: String
  }

  type Query {
    attempts: [Attempt!]
    attempt(id: ID!): Attempt
  }

  type Mutation {
    updateAttempt(id: ID!, attemptInput: AttemptUpdateInput): Attempt!
    toggleAttemptCompleted(id: ID!): Attempt
  }

`