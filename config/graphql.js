import { graphqlExpress, graphiqlExpress } from 'apollo-server-express';
import { makeExecutableSchema } from 'graphql-tools';
import schema from '../graph/schema';
import resolvers from '../graph/resolvers';

const graph = () => {
  const graphSchema = makeExecutableSchema({
    typeDefs: schema,
    resolvers: resolvers,
  });

  return graphqlExpress((request) => {
    return {
      schema: graphSchema,
      context: {
        user: request.user,
      },
    };
  });
};

export const graphUi = () => {
  return graphiqlExpress({
    endpointURL: '/graphql',
  });
};

export default graph;
