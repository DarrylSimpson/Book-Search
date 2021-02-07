const { gql, addErrorLoggingToSchema } = require('apollo-server-express');


const typeDefa = gql`
    type Query {
        me: User
    }

    type User {
        _id: ID
        username: String
        email: String
        bookCount: Int
        savedBooks: [Book]
    }



// type Book 



//type Auth

//Input saveInput
//authors: [String]
//title: String




type Mutation {
login(email: String!, password: String!): Auth
addUser(username: String!,)
saveBook(saveData: saveInput!): User
removeBook(bookId: ID!): User
}
`;
module.exports = typeDefs;