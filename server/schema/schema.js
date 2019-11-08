const graphql = require("graphql");

const RootQueryType = require("./types/root_query_type"),
      mutations = require("./mutations");

const {
  GraphQLSchema
} = graphql;

// import that lovely Root Query you just finished up and create your new schema!
const query = require("./types/root_query_type");

module.exports = new GraphQLSchema({
  query: RootQueryType,
  mutation: mutations
});