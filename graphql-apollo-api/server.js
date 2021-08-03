const express = require('express');
const { ApolloServer, gql } = require('apollo-server-express');
const cors = require('cors');
const dotEnv = require('dotenv');

const { tasks, users } = require('./constants')

// set env variables
dotEnv.config();

const app = express();

//cors
app.use(cors());

// body parser middleware
app.use(express.json());

const typeDefs = gql`
  type Query {
    greetings: [String!]!
    tasks: [Task!]
    task(id: ID!): Task
  }

  type User {
    id: ID!
    name: String!
    email: String!
    tasks: [Task!]
  }

  type Task {
    id: ID!
    name: String!
    completed: Boolean!
    user: User!
  }
`;

const resolvers = {
  Query: {
    greetings: () => ["Hello", "hi"],
    tasks: () => {
      console.log(tasks);
      return tasks;
    },
    task: (_, { id }) => tasks.find(task => task.id === id)
  },
  Task: {
    user: ({ userId }) => {
      console.log('userId: ', userId);
      return users.find(user => user.id === userId)
    }
  }
};

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
