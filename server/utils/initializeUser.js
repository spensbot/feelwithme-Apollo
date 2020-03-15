const User = require('../models/user')
const Match = require('../models/match')
const generateMatches = require('./generateMatches')
const vars = require('../config/vars')
const axios = require('axios')

//Get the users top artists and tracks
//Then create/save top matches
async function initializeUser(user) {

  const matchCount = 10

  await populateTopTracks(user)

  await populateTopArtists(user)

  await deleteExistingMatches(user)

  const matches = await generateMatches(user, matchCount)

  await Match.insertMany(matches)

  user.isInitialized = true;
  return user.save()
}

async function populateTopTracks(user) {

    let requestConfig = {
        url: vars.spotifyApi.url + vars.spotifyApi.userTopTracks,
        method: 'get',
        headers: { Authorization: 'Bearer ' + user.spotifyAccessToken},
        responseType: 'json',
        params: {
            limit: 50,
            time_range: 'long_term'
        }
    }

    const response = await axios.request(requestConfig)

    const topTrackIds = response.data.items.map(reduceToId)

    user.set('topTracks', topTrackIds)

    return user.save()
}

async function populateTopArtists(user) {

    let requestConfig = {
        url: vars.spotifyApi.url + vars.spotifyApi.userTopArtists,
        method: 'get',
        headers: { Authorization: 'Bearer ' + user.spotifyAccessToken},
        responseType: 'json',
        params: {
            limit: 50,
            time_range: 'long_term'
        }
    }

    const response = await axios.request(requestConfig)

    const topArtistIds = response.data.items.map(reduceToId)

    user.set('topArtists', topArtistIds)

    return user.save()
}

function reduceToId(spotifyObject){
    return spotifyObject.id
}

async function deleteExistingMatches(user){
  await Match.deleteMany({user1: user._id}, function (err) {
    if (err) {
      console.log(err)
    }
  })
}

module.exports = initializeUser