const express = require('express')
const {ApolloServer, gql} = require('apollo-server-express')
const fetch = require('node-fetch');
var cors = require('cors');



const programmers = [
  {id: '1', name: 'Tontin', skills: ['ver dross en youtube', 'ver el chavo del ocho']},
  {id: '2', name: 'Enrique', skills: ['viajar y kgarse de frio', 'and muchos mas']},
  {id: '3', name: 'Gustavo', skills: ['dragon bound', 'hacer bugs']},
]

const getProgrammerFunction = (id) => programmers.find(p => p.id === id)

let count = 0

const incrementCount = (number = 1) => {
  console.log('current count', count)
  console.log('number to inc', number)
  count += number
  return count
}

const fetchFromPortPassport = () => {
  return fetch('https://dev.portpassport.com/api/initialState')
    .then(res => res.json())
    .then(res => res.data.userRoles)
}




const typeDefs = gql`
  # which types we can consume 
  type Programmer {
    id: ID
    name: String
    skills: [String]
  }
  type PPUserRole {
    id: String
    name: String
  }
  
  # parent types: Query, Mutation and Subscriptions (websockets!!?) 
  type Query {
    programmers: [Programmer]
    programmer(id: ID!): Programmer
    count: Int
    portPassportRoles: [PPUserRole]
  }
  type Mutation {
    incCount(number: Int): Int 
  }
`

const resolvers = {
  Query: {
    programmers: () => programmers,
    programmer: (parent, {id}) => getProgrammerFunction(id),
    count: () => count,
    portPassportRoles: () => fetchFromPortPassport()
  },
  Mutation: {
    incCount: (parent, {number}) => incrementCount(number)
  }
}

const server = new ApolloServer({typeDefs, resolvers})

const app = express();
server.applyMiddleware({ app })

app.use(cors());

app.listen({port: 4000}, () =>
  console.log("Now browse to http://localhost:4000" + server.graphqlPath)
)