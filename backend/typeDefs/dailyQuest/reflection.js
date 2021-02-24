const { gql } = require('apollo-server')

module.exports = gql`
  type Reflection {
    id: ID!
    title: String!
    description: String!
    entries: [Entry!]
  }
  input ReflectionInput {
    title: String!
    description: String!
  }
  input ReflectionUpdateInput {
    title: String
    description: String
  }

  type Query {
    reflections: [Reflection!]
    reflection(id: ID!): Reflection
  }
  type Mutation {
    createReflection(reflectionInput: ReflectionInput): Reflection
    deleteReflection(id: ID!): Reflection
    updateReflection(id: ID!, reflectionInput: ReflectionUpdateInput): Reflection!
    initializeReflection: [Reflection!]
  }


`