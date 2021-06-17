const { ApolloServer, gql } = require('apollo-server')
const users = require('./db/users.json');


const typeDefs = gql`
type User{
    id: Int
    userName: String
    email: String
    password: String
}
type Query {
    users: [User]
  }

`
const resolvers = {
    Query: {
        users: () => users
    },
};

const server = new ApolloServer({
    typeDefs,
    resolvers
});


server.listen().then(({ url }) => {
    console.log(`🚀 Apollo Server ready at ${url}`);
});

module.exports = {
    handler: server
}