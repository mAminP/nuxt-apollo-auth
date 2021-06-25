const jwt = require('jsonwebtoken');
const { ApolloServer, gql, ApolloError, AuthenticationError } = require('apollo-server');
const { accounts } = require('./db/index')
var JWTprivateKey = 'PrIvAtEkEy!@!@!@!@#!@!@@';


const generateToken = (user) => {
  const token = jwt.sign({
    userId: user.id,
    email: user.email,
    name: user.name,
    roles: user.roles
  }, JWTprivateKey, {
    algorithm: 'HS256',
    expiresIn: 60*60*60
  });
  return token
}

const decodeToken = (token) => {
  try {
    var decoded = jwt.verify(token, JWTprivateKey);
    return decoded
  } catch (err) {
    throw new Error('login Again ')
  }
}

const getUser = (token) => {
  try {

    const decodedToken = decodeToken(token.split(' ')[1])

    const user = accounts.find(u => u.id === decodedToken.userId)

    return user || null

  } catch (error) {
    return null
  }
}

const typeDefs = gql`
    type Account {
      id: ID!
      name: String!
      email: String!
      password: String!
      roles: [String]!
      permissions: [String]!
    }
    type Query {
      accounts: [Account]!,
      me: MePayload!
    }
    type MePayload {
      user: Account!
    }
    type Mutation {
      register(data:RegisterInput): Account!
      login(data:LoginInput): AuthPayload!
    }
    input RegisterInput{
      name: String!
      email: String!
      password: String!
    }
    input LoginInput{
      email: String!
      password: String!
    }
    type AuthPayload{
      token: String!
    }
`

const resolvers = {
  Mutation: {
    register(_, args, ctx, info) {
      return args.data
    },
    login(_, { data }, ctx, info) {
      const { email, password } = data

      const user = accounts.find(q => q.email === email)
      if (!user) {
        throw new ApolloError('user not Found!')
      }
      if (user.password !== password) {
        throw new ApolloError('user password is incorrect!')
      }
      return {
        token: generateToken(user)
      }
    }
  },
  Query: {
    me: (_,args,{user}) => {
      if(!user) {
        return new AuthenticationError("user not auth !!")
      }
      return {
        user
      }
    },
    accounts: () => (accounts)
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => {

       // Get the user token from the headers.
    const token = req.headers.authorization || '';

       // Try to retrieve a user with the token
    const user = getUser(token);

    //   // Add the user to the context
    return { user };
  }
});

server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`)
});

module.exports  = {
  handler: server
}