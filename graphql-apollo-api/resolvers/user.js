const bcrypt = require('bcryptjs');

const { users, tasks } = require('../constants');
const User = require('../database/models/user');

module.exports = {
  Query: {
    users: () => users,
    user: (_, { id }) => {
      return users.find(user => user.id === id)
    },
  },
  Mutation: {
    signup: async (_, { input }) => {
      try {
        const user = await User.findOne({ email: input.email });
        if (user) {
          throw new Error('Email already in use');
        }
        const hashedPassword = await bcrypt.hash(input.password, 12);
        const newUser = new User({ ...input, password: hashedPassword });
        const result = await newUser.save();
        return result;
      } catch (error) {
        console.log('error: ', error);
        throw error;
      }
    }
  },
  User: {
    tasks: ({ id }) => tasks.filter(task => task.userId === id)
  }
}