const { gql } = require('apollo-server')

module.exports = gql` 
  type Area { 
    id: ID!
    title: String!
    summary: String!
    goals: [Goal!]
  }
  input AreaInput { 
    title: String!
    summary: String!
  }

  type Query { 
    areas: [Area!]
    area(id: ID!): Area
  }
  type Mutation { 
    createArea(areaInput: AreaInput): Area
    deleteArea(id: ID!): Area
    updateArea(id: ID!, areaInput: AreaInput): Area!
  }

`
