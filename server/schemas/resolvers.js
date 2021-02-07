const { User,  Book } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
    Query: {
        me: async (parent, args, context) => {
          if (context.user) {
            const userData = await User.findOne({ _id: context.user._id })
              .select('-__v -password')
              .populate('savedBooks')

            return userData;
          }
    
          throw new AuthenticationError('Not logged in');
        }
    },
     //edit
    Mutation: {
        addUser: async (parent, args) => {
            const user = await User.create(args);
            const token = signToken(user);
      
            return { token, user };
          },
          login: async (parent, { email, password }) => {
            const user = await User.findOne({ email });
      
            if (!user) {
              throw new AuthenticationError('Incorrect credentials');
            }
      
            const correctPw = await user.isCorrectPassword(password);
      
            if (!correctPw) {
              throw new AuthenticationError('Incorrect credentials');
            }
      
            const token = signToken(user);
            return { token, user };
          },
          saveBook: async (parent, args, context) => {
            if (context.user) {
                const bookstats = { 
                    bookId: args.bookId, 
                    description: args.description, 
                    title: args.title, 
                    authors: args.authors,
                    image: args.image,
                    link: args.link
              }
              console.log('bookstats: ', bookstats)
                const updateUserBooks = await User.findByIdAndUpdate(
                    { _id: context.user._id },
                    { $addToSet: { savedBooks: bookstats } },
                    { new: true }
                )
                // ).populate('savedBooks')
                console.log('updateUserBooks: ', updateUserBooks)

                return updateUserBooks;
            }

            throw new AuthenticationError('You need to be logged in!');
        },
          removeBook: async (parent, { bookId }, context) => {
            if (context.user) {
              const updatedUser = await User.findByIdAndUpdate(
                { _id: context.user._id },
                { $pull: { saveBooks: { bookId: bookId } } },
                { new: true }
              ).populate('savedBooks');
      
              return updatedUser;
            }
      
            throw new AuthenticationError('You need to be logged in!');
          },
    }
}


module.exports = resolvers;