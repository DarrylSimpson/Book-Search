const express = require('express')
const path = require('path')
const { ApolloServer } = require('apollo-server-express')
const { typeDefs, resolvers } = require('./schemas')
const db = require('./config/connection')
const { authMiddleware } = require('./utils/auth')
const mongoose = require('mongoose');


const PORT = process.env.PORT || 3001
const app = express()
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: authMiddleware
})

server.applyMiddleware({ app })

app.use(express.urlencoded({ extended: false }))
app.use(express.json())

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/Book-Search', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: true,
});

module.exports = mongoose.connection;

// Serve up static assets
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')))
}

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build/index.html'))
})

db.once('open', () => {
  app.listen(PORT, () => {
    console.log(`🌍 Now listening on localhost:${PORT}`)
    console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`)
  })
})