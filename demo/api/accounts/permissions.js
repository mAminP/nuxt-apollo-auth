const { rule, shield } = require("graphql-shield");

const isAuthenticated = rule()((parent, args, { user }) => {
  return user !== null;
});

const permissions = shield({
  Query: {
    viewer: isAuthenticated
  }
});

module.exports = { permissions };