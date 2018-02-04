export default `
  type Artist {
    id: ID!
    firstName: String,
    lastName: String,
    songs: [Song]
  }

  type Query {
    artists: [Artist]
    artist(
      id: ID!
    ): Artist
  }

  type Mutation {
    createArtist(
      firstName: String!
      lastName: String!
    ): Artist
    updateArtist(
      id: ID!
      firstName: String!
      lastName: String!
    ): Artist
    deleteArtist(
      id: ID!
    ): Artist
  }
`
