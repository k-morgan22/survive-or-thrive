const { gql } = require('apollo-server')

module.exports = gql`
  type Entry {
    id: ID!
    title: String!
    body: String
    isCompleted: Boolean!
    createdAt: DateTime!
    reflection: Reflection!
    dailyQuest: DailyQuest!
  }

  input EntryUpdateInput {
    body: String
  }

  type Query {
    entries: [Entry!]
    entry(id: ID!): Entry
  }
  type Mutation {
    updateEntry(id: ID!, entryInput: EntryUpdateInput): Entry!
    toggleEntryCompleted(id: ID!): Entry
  }

`