// @flow
import uuid from 'uuid'
import * as db from './dynamo'

const TableName = 'artists'

export const getArtists = () =>
  db.listItems({
    TableName,
    AttributesToGet: [
      'id',
      'firstName',
      'lastName'
    ]
  })

export const getArtistById = (id: string): Promise<*> =>
  db.getItem({
    TableName,
    Key: { id }
  })

export const createArtist = (args: {
  firstName: string,
  lastName: string
}): Promise<*> =>
  db.createItem({
    TableName,
    Item: {
      id: uuid(),
      firstName: args.firstName,
      lastName: args.lastName
    }
  })

export const updateArtist = (args: {
  id: string,
  firstName: string,
  lastName: string
}): Promise<*> =>
  db.updateItem({
    TableName,
    Key: { id: args.id },
    ExpressionAttributeValues: {
      ':firstName': args.firstName,
      ':lastName': args.lastName
    },
    UpdateExpression: 'SET firstName = :firstName, lastName = :lastName',
    ReturnValues: 'ALL_NEW'
  }, args)

export const deleteArtist = (args: { id: string }): Promise<*> =>
  db.deleteItem({
    TableName,
    Key: { id: args.id }
  }, args)
