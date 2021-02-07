const { gql } = require('apollo-server-express');


const typeDefa = gql`
    type Query {
        me: User
    }

    type User {
        _id: ID
        username: String!
        email: String!
        bookCount: Int
        savedBooks: [Book]
    }

    type Book {
        bookId: String
        authors: [String]
        description: String!
        title: String!
        image: String
        link: String
    }

    type Auth {
        token: ID!
        user: User
    }

    Input bookList {
        bookId: String!
        title: String!
        description: String!
        aurthors: [String]
        title: String
        image: String
        link: String
    }

    type Mutation {
        login(username: String, email: String!, password: String!): Auth
        addUser(username: String!, email: String, password: String!)
        saveBook(bookId: String!, title: String!, description: String!, authors: [String], image: String, link: String): User
        removeBook(bookId: String!): User
    }
`;
module.exports = typeDefs;