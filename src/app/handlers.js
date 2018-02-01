// @flow
import dynamodb from './dynamodb'

export const hello = (event: Object, context: Object, callback: Function): void =>
  callback(null, process.env.DYNAMODB_TABLE)

export const bye = (event: Object, context: Object, callback: Function): void =>
  callback(null, 'bye')
