const { gql } = require('apollo-server')

module.exports = gql`
  type Profile {
    id: ID!
    name: String!
    profileImage: String!
    level: Int!
    exp: Int!
    nextLevel: Int!
    nextLevelBar: String!
    hp: Int!
    hpBar: String!
    gold: Int!
    user: User!
  }
  input ProfileInput {
    profileImage: String
    user: String!
  }

  input ProfileUpdateInput {
    name: String
    profileImage: String
    level: Int
    exp: Int
    nextLevel: Int
    nextLevelBar: String
    hp: Int
    hpBar: String
    gold: Int
  }

  type Query {
    profile(id: ID!): Profile
    profileByUsername(username: String!): Profile
  }

  type Mutation {
    createProfile(profileInput: ProfileInput): Profile
    deleteProfile(id: ID!): Profile
    updateProfile(id: ID!, profileInput: ProfileUpdateInput): Profile
    increaseExp(id: ID!, type: String!, difficulty: Int!): Profile
    increaseGold(id: ID!, type: String!, difficulty: Int!): Profile
    decreaseHp(id: ID!, type: String!, difficulty: Int!): Profile
    levelUp(id: ID!): Profile
    levelDown(id: ID!): Profile
  }

`