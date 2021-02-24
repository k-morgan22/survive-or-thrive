const { gql } = require('apollo-server')

module.exports = gql`
  type Habit {
    id: ID!
    title: String!
    description: String!
    attempts: [Attempt!]
  }

  input HabitInput {
    title: String!
    description: String!
  }

  input HabitUpdateInput {
    title: String
    description: String
  }

  type Query {
    habits: [Habit!]
    habit(id: ID!): Habit
  }

  type Mutation {
    createHabit(habitInput: HabitInput): Habit
    deleteHabit(id: ID!): Habit
    updateHabit(id: ID!, habitInput: HabitUpdateInput): Habit!
    initializeHabit: [Habit!]
  }

`