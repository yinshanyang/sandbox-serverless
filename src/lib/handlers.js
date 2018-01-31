// @flow
export const hello = (event: Object, context: Object, callback: Function): void =>
  callback(null, 'hello')

export const bye = (event: Object, context: Object, callback: Function): void =>
  callback(null, 'bye')
