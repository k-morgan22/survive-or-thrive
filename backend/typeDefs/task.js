const { gql } = require('apollo-server')

module.exports = gql` 
  type Task { 
    id: ID!
    title: String!
    description: String!
    status: String!
    impact: String!
    targetDate: String!
    project: Project!
  }

  input TaskInput { 
    title: String!
    description: String!
    status: String!
    impact: String!
    targetDate: String!
    project: String!
  }

  input TaskUpdateInput{
    title: String
    description: String
    status: String
    impact: String
    targetDate: String
    project: String
  }

  type Query { 
    tasks: [Task!]
    task(id: ID!): Task
  }

  type Mutation { 
    createTask(taskInput: TaskInput): Task
    deleteTask(id: ID!): Task
    updateTask(id: ID!, taskInput: TaskUpdateInput): Task!
  }

`