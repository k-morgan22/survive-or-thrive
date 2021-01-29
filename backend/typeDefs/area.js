import { gql } from 'apollo-server'; 

const area = gql` 
  type Area { 
    id: ID!
    title: String!
    summary: String!
    goals: [String]
  }
  input AreaInput { 
    title: String!
    summary: String!
    goals: [String] 
  }

  type Query { 
    areas: [Area]
    area(id: ID!): Area
  }
  type Mutation { 
    createArea(areaInput: AreaInput): Area
    deleteArea(id: ID!): Area
    updateArea(id: ID!, areaInput: AreaInput): Area!
  }

`
export default area 