require("dotenv").config();
const db = require("./db");
const express = require("express");
const { ApolloServer } = require("apollo-server-express");
const typeDefs = require("./schema");
const resolvers = require("./resolvers");

// Apollo Server setup
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: () => {
    // Add the db models to the context
    return { models };
  },
});

// Run the server on a port specified in our .env file or port 4000
const port = process.env.PORT || 4000;
const DB_HOST = process.env.DB_HOST;
const models = require("./models");

// app setup
const app = express();
// Apply the Apollo GraphQL middleware and set the path to /api
server.applyMiddleware({ app, path: "/api" });

db.connect(DB_HOST);

app.listen({ port }, () =>
  console.log(
    `GraphQL Server running at http://localhost:port${server.graphqlPath}`
  )
);
