// @flow
import { graphqlLambda } from 'graphql-server-lambda'
import { makeExecutableSchema } from 'graphql-tools'
import { mergeResolvers, mergeTypes } from 'merge-graphql-schemas'

import artistType from './data/types/artist'
import songType from './data/types/song'

import artistResolver from './data/resolvers/artist'
import songResolver from './data/resolvers/song'

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
