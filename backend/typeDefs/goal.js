const { gql } = require('apollo-server')

module.exports = gql` 
  type Goal { 
    id: ID!
    title: String!
    description: String!
    status: String!
    impact: String!
    targetDate: String!
    area: Area!
  }

  input GoalInput { 
    title: String!
    description: String!
    status: String!
    impact: String!
    targetDate: String!
    area: String!
  }

  type Query { 
    goals: [Goal!]
    goal(id: ID!): Goal
  }

  type Mutation { 
    createGoal(goalInput: GoalInput): Goal
    deleteGoal(id: ID!): Goal
  }

`