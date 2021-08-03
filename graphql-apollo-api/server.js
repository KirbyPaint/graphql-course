const express = require('express');
const { ApolloServer, gql } = require('apollo-server-express');
const cors = require('cors');
const dotEnv = require('dotenv');

const typeDefs = require('./typeDefs');
const resolvers = require('./resolvers');

// set env variables
dotEnv.config();

const app = express();

//cors
app.use(cors());

// body parser middleware
app.use(express.json());

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers
});

apolloServer.start();

apolloServer.applyMiddleware({ app, path: '/graphql' });

const PORT = process.env.PORT || 3000;

app.use('/', (req, res, next) => {
  res.send({ message: 'Hello' });
})

app.listen(PORT, () => {
  console.log(`Server listening on PORT: ${PORT}`);
  console.log(`Graphql Endpoint: ${apolloServer.graphqlPath}`);
});
