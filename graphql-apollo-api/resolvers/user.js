const { users, tasks } = require('../constants');

module.exports = {
  Query: {
    users: () => users,
    user: (_, { id }) => {
      return users.find(user => user.id === id)
    },
  },
  Mutation: {
  },
  User: {
    tasks: ({ id }) => tasks.filter(task => task.userId === id)
  }
}