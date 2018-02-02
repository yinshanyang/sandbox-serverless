// @flow
import uuid from 'uuid'
import * as db from './dynamo'

const TableName = 'songs'

export const getSongs = () =>
  db.listItems({
    TableName,
    AttributesToGet: [
      'id',
      'title',
      'artist',
      'duration'
    ]
  })

export const getSongById = (id: string): Promise<*> =>
  db.getItem({
    TableName,
    Key: { id }
  })

export const getSongsByArtist = (artistId: string): Promise<*> =>
  db.scan({
    TableName,
    FilterExpression: 'artist = :artist_id',
    ExpressionAttributeValues: { 'artist_id': artistId }
  })

export const createSong = (args: {
  title: string,
  artist: string,
  duration: number
}): Promise<*> =>
  db.createItem({
    TableName,
    Item: {
      id: uuid(),
      title: args.title,
      artist: args.artist,
      duration: args.duration
    }
  })

export const updateSong = (args: {
  id: string,
  title: string,
  artist: string,
  duration: number
}): Promise<*> =>
  db.updateItem({
    TableName,
    Key: { id: args.id },
    ExpressionAttributeValues: {
      ':title': args.title,
      ':artist': args.artist,
      ':duration': args.duration
    },
    UpdateExpression: 'SET title = :title, artist = :artist, #song_duration = :duration',
    ReturnValues: 'ALL_NEW'
  }, args)

export const deleteSong = (args: { id: string }): Promise<*> =>
  db.deleteItem({
    TableName,
    Key: { id: args.id }
  }, args)
