const express = require('express');
//  import ApolloServer
const { ApolloServer } = require('apollo-server-express'); 

// imort our typeDefs and resolvers
const { typeDefs, resolvers } = require('./server/schemas');
const db = require('./config/connection');

const PORT = process.env.PORT || 3001;
// crate a new Apollo server and pass in our schema data

async function startApolloServer (typeDefs, resolvers) {
  // create a new Apollo server and pass in our schema data
  const server = new ApolloServer({
    typeDefs,
    resolvers
  });
  
  const app = express();
  await server.start();
  
  // integrate our Apollo server with the Express application as middleware
  server.applyMiddleware({ app });

  app.use(express.urlencoded({ extended: false }));
  app.use(express.json());
  
  db.once('open', () => {
    app.listen(PORT, () => {
      console.log(`API server running on port ${PORT}!`);
      // log where we can go to test our GQL API
      console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`);
    });
  });
}

startApolloServer (typeDefs, resolvers);



