import { ApolloServer, gql } from 'apollo-server'
import users from './db/users.json'
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
`;
const resolvers = {
    Query: {
        users: () => users
    },
};

const server = new ApolloServer({ typeDefs, resolvers });


server.listen().then(({ url }) => {
    console.log(`🚀  Server ready at ${url}`);
});

export default{
    handler: server
}