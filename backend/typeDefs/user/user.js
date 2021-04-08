const { gql } = require('apollo-server')

module.exports = gql`
  type User {
    id: ID!
    name: String!
    username: String!
    email: String!
    profile: Profile!
  }
  input UserInput {
    name: String!
    username: String!
    email: String!
  }

  input UserUpdateInput {
    name: String
    username: String
    email: String
  }

  type Query {
    user(id: ID!): User
    usernameExists(username: String!): Boolean
    userByUsername(username: String!): User
  }

  type Mutation {
    createUser(userInput: UserInput): User
    deleteUser(id: ID!): User
    updateUser(id: ID!, userInput: UserUpdateInput): User
  }

`