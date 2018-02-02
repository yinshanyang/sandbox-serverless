// @flow
import { graphqlLambda } from 'graphql-server-lambda'
import { makeExecutableSchema } from 'graphql-tools'
import { mergeResolvers, mergeTypes } from 'merge-graplql-schemas'

import artistType from './data/type/artist'
import songType from './data/type/song'

import artistResolver from './data/resolver/artist'
import songResolver from './data/resolver/song'

const typeDefs = mergeTypes([ artistType, songType ])
const resolvers = mergeResolvers([ artistResolver, songResolver ])

const schema = makeExecutableSchema({ typeDefs, resolvers })

module.exports.graphql = (event, context, callback) =>
  graphqlLambda({ schema })(
    event,
    context,
    (error, output) =>
      callback(error, {
        ...output,
        headers: {
          'Access-Control-Allow-Origin': '*'
        }
      })
  )
