const { gql } = require('apollo-server-express');

module.exports = gql`

#-------------     OPERATIONS     ----------

  type Query {
    me: User
    user(id: ID!): User
    allMessages: [Message!]!
    scopedMessages(id: ID!): [Message!]!
    newMessages: [Message!]!
    messagedUsers: [ID!]!
    matches(limit: Int): [Match!]!
    artists(spotifyIds: [ID!]!): [Artist!]!
    tracks(spotifyIds: [ID!]!): [Track!]!
    signedProfilePicUploadUrl: String!
  }
  
  type Mutation {
    createMessage(to: ID!, content: String!): Message!
    setMessageViewed(message: ID!): Message!
    updateProfile(displayName: String, bio: String, imageUrl: String): User!
  }

  type Subscription {
    messageInProgress: User!
    newMessage: Message!
    viewedMessage: Message!
  }

#-----------     OBJECT DEFS     ------------

  type User {
    id: ID!
    spotifyId: ID!
    spotifyProfileUrl: URL!
    isInitialized: Boolean!
    displayName: String!
    bio: String
    imageUrl: URL
    topTracks: [Track!]!
    topArtists: [Artist!]!
  }

  type Message {
    id: ID!
    from: ID!
    to: ID!
    content: String!
    sent: Date!
    viewed: Date
  }

  type Match {
    id: ID!
    user: User!
    trackCount: Int!
    artistCount: Int!
    weightedMatch: Float!
  }

  type Artist {
    id: ID!
    name: String!
    spotifyUrl: URL!
    imageUrl: URL
    popularity: Int!
  } 

  type Track {
    id: ID!
    name: String!
    spotifyUrl: URL!
    imageUrl: URL
    artistName: String!
    popularity: Int!
  }

#------------     TYPE DEFS     -----------

  scalar Date
  scalar URL
`;