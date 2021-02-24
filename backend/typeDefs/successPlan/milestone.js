const { gql } = require('apollo-server')

module.exports = gql` 
  type Milestone { 
    id: ID!
    title: String!
    description: String!
    status: String!
    impact: String!
    targetDate: String!
    goal: Goal!
    projects: [Project!]
  }

  input MilestoneInput { 
    title: String!
    description: String!
    status: String!
    impact: String!
    targetDate: String!
    goal: String!
  }

  input MilestoneUpdateInput{
    title: String
    description: String
    status: String
    impact: String
    targetDate: String
    goal: String
  }

  type Query { 
    milestones: [Milestone!]
    milestone(id: ID!): Milestone
  }

  type Mutation { 
    createMilestone(milestoneInput: MilestoneInput): Milestone
    deleteMilestone(id: ID!): Milestone
    updateMilestone(id: ID!, milestoneInput: MilestoneUpdateInput): Milestone!
  }

`