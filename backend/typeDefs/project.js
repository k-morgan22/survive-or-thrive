const { gql } = require('apollo-server')

module.exports = gql` 
  type Project { 
    id: ID!
    title: String!
    description: String!
    status: String!
    impact: String!
    targetDate: String!
    milestone: Milestone!
  }

  input ProjectInput { 
    title: String!
    description: String!
    status: String!
    impact: String!
    targetDate: String!
    milestone: String!
  }

  input ProjectUpdateInput{
    title: String
    description: String
    status: String
    impact: String
    targetDate: String
    milestone: String
  }

  type Query { 
    projects: [Project!]
    project(id: ID!): Project
  }

  type Mutation { 
    createProject(projectInput: ProjectInput): Project
    deleteProject(id: ID!): Project
    updateProject(id: ID!, projectInput: ProjectUpdateInput): Project!
  }

`