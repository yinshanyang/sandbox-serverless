import AWS from 'aws-sdk'

let options = {}
if (process.env.IS_OFFLINE) {
  options = {
    region: 'localhost',
    endpoint: 'http://localhost:8000'
  }
}
const client = new AWS.DynamoDB.DocumentClient(options)

export const listItems = (params) =>
  new Promise((resolve, reject) =>
    client.scan(params).promise()
      .then((data) => resolve(data.Items))
      .catch((error) => reject(error))
  )

export const getItem = (params) =>
  new Promise((resolve, reject) =>
    client.get(params).promise()
      .then((data) => resolve(data.Item))
      .catch((error) => reject(error))
  )

export const createItem = (params, args) =>
  new Promise((resolve, reject) =>
    client.put(params).promise()
      .then(() => resolve(params.Item))
      .catch((error) => reject(error))
  )

export const updateItem = (params, args) =>
  new Promise((resolve, reject) =>
    client.update(params).promise()
      .then(() => resolve(args))
      .catch((error) => reject(error))
  )

export const deleteItem = (params, args) =>
  new Promise((resolve, reject) =>
    client.delete(params).promise()
      .then(() => resolve(args))
      .catch((error) => reject(error))
  )
