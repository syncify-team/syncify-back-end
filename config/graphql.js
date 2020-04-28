import { graphqlExpress, graphiqlExpress } from 'apollo-server-express';
import { makeExecutableSchema } from 'graphql-tools';
import Jwt from 'express-jwt';
import jwksRsa from 'jwks-rsa';
import Cors from 'cors';
import colors from 'colors';
import schema from '../graph/schema';
import resolvers from '../graph/resolvers';
import Connector from '../graph/connector';

const graph = () => {
  const graphSchema = makeExecutableSchema({
    typeDefs: schema,
    resolvers: resolvers,
  });

  return graphqlExpress((request) => {
    const user = request.user;

    const ip =
      request.headers['x-forwarded-for'] ||
      request.connection.remoteAddress ||
      request.socket.remoteAddress ||
      request.connection.socket.remoteAddress;

    const connector = new Connector({
      uid: user.sub,
      roles: ['user'],
      ip: ip,
    });

    return {
      schema: graphSchema,
      context: {
        request,
        connector,
      },
    };
  });
};

const graphUi = () => {
  return graphiqlExpress({
    endpointURL: '/graphql',
  });
};

const cors = () => {
  return Cors({
    methods: ['POST'],
    allowedHeaders: 'Origin, Accept, Content-Type, Authorization',
  });
};

const jwt = () => {
  const secret = jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: 'https://dev-pk6q9q8u.eu.auth0.com/.well-known/jwks.json',
  });

  return Jwt({
    secret: secret,
    issuer: 'https://dev-pk6q9q8u.eu.auth0.com/',
    algorithms: ['RS256'],
    getToken: (request) => {
      if (request.headers.authorization) {
        const [bearer, token] = request.headers.authorization.split(' ');
        return bearer === 'Bearer' && token ? token : null;
      }

      return null;
    },
  }).unless({ path: ['/admin/graphiql'] });
};

export default class GraphQL {
  static configure(app) {
    app.use('/graphql', cors(), jwt(), graph());

    app.use('/graphiql', graphUi());
  }
}
