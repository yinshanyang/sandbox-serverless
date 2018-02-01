// @flow
import uuid from 'uuid'
import * as db from './dynamo'

const TableName = 'artists'

export const getArtists = () =>
  db.listItems({
    TableName,
    AttributesToGet: [
      'id',
      'first_name',
      'last_name'
    ]
  })

export const getArtistById = (id: string): Promise<*> =>
  db.getItem({
    TableName,
    Key: { id }
  })

export const createArtist = (args: {
  first_name: string,
  last_name: string
}): Promise<*> =>
  db.createItem({
    TableName,
    Item: {
      id: uuid(),
      first_name: args.first_name,
      last_name: args.last_name
    }
  })

export const updateArtist = (args: {
  id: string,
  first_name: string,
  last_name: string
}): Promise<*> =>
  db.updateItem({
    TableName,
    Key: { id: args.id },
    ExpressionAttributeValues: {
      ':first_name': args.first_name,
      ':last_name': args.last_name
    },
    UpdateExpression: 'SET first_name = :first_name, last_name = :last_name',
    ReturnValues: 'ALL_NEW'
  }, args)

export const deleteArtist = (args: { id: string }): Promise<*> =>
  db.deleteItem({
    TableName,
    Key: { id: args.id }
  }, args)
