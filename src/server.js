require('dotenv').config();
const db = require('./db');
const express = require('express');
const { ApolloServer, gql } = require('apollo-server-express');
// Run the server on a port specified in our .env file or port 4000
const port = process.env.PORT || 4000;
const DB_HOST = process.env.DB_HOST;
const models = require('./models');

// notes dummy data
let notes = require('./dummyNotes');

// schema
const typeDefs = gql`
  type Query {
    hello: String
    notes: [Note!]!
    note(id: ID!): Note!
  }
  type Mutation {
    newNote(content: String!): Note!
  }
  type Note {
    id: ID!
    content: String!
    author: String!
  }
`;

// resolvers
const resolvers = {
  Query: {
    hello: () => 'Hello world!',
    notes: () => notes,
    note: (parent, args) => {
      return notes.find((note) => note.id === args.id);
    },
  },
  Mutation: {
    newNote: (parent, args) => {
      let noteValue = {
        id: notes.length.toString(),
        content: args.content,
        author: 'nugi',
      };
      notes.push(noteValue);
      return noteValue;
    },
  },
};

const app = express();
db.connect(DB_HOST);

// Apollo Server setup
const server = new ApolloServer({ typeDefs, resolvers });
// Apply the Apollo GraphQL middleware and set the path to /api
server.applyMiddleware({ app, path: '/api' });
app.listen({ port }, () =>
  console.log(
    `GraphQL Server running at http://localhost:port${server.graphqlPath}`
  )
);
// console.log(models);
// change from vscode
// ini yang diganti