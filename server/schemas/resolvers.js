const { Book, User } = require('../models');
const { AuthenticationError } = require('apollo-server-express');
const { signToken } = require('../utils/auth');

const resolvers = {
  Query: {
    me: async (parent, args, context) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id }).select();
      };
      throw new AuthenticationError("You must be logged in")
    },
  },

  Mutation: {
    createUser: async (parent, { username, email, password }) => {
        const user = await User.create({ username, email, password });
        const token = signToken(user);
        return { token, user };
      }, 

    login:  async (parent, { email, password }) => {
        const user = await User.findOne({ email });
        if (!user) {
            throw new AuthenticationError("Please provide a valid email")
        }
        const correctPw = await user.isCorrectPassword(password);
        if (!correctPw) {
            throw new AuthenticationError("Email or Password invalid");
        }
        const token = signToken(user);
        return { token, user };
    },

    saveBook: async (parent, { input }, context) => {
        if (context.user) {
            const updatedUser = await User.findOneAndUpdate(
                {_id: context.user._id },
                { $addToSet: { savedBooks: input }},
                { new: true },
            );
            return updatedUser;
        }
        throw new AuthenticationError("You must be logged in")
      },

    deleteBook: async (parent, { bookId }, context) => {
        if (context.user) {
            const updatedUser = await User.findOneAndUpdate(
                { _id: context.user._id },
                { $pull: { savedBooks: { bookId: bookId }}},
                { new: true },
            );
            return updatedUser;
        }
        throw new AuthenticationError("You must be logged in")
    },
  },
};
module.exports = resolvers;