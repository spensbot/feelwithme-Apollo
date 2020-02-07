//Determine if the app is running on a local dev server (vs. deployed)
let dev = (window.location.hostname === 'localhost')
let httpProtocol = dev ? 'http' : 'https'
let wsProtocol = dev ? 'ws' : 'wss'
let wsEndpoint = ''
let serverHost = dev ? 'localhost' : 'feelwithme-backend.herokuapp.com'
let serverPort = dev ? ':8000' : ''
let serverUrl = httpProtocol + '://' + serverHost + serverPort

const Config = {
    serverUrl: serverUrl,
    wsServerUrl: wsProtocol + '://' + serverHost + serverPort + wsEndpoint,
    homeRoute: dev ? '' : '/feelwithme',
    serverRoutes: {
        otherUsersUrl: serverUrl + '/api/users/',
        matchesUrl: serverUrl + '/api/user/matches',
        mainUserUrl: serverUrl + '/api/user',
        authUrlSpotify: serverUrl + '/auth/spotify',
        logoutUrl: serverUrl + '/auth/logout',
    },
    routes: {
        login: '/login',
        users: '/users/',
        about: '/about',
        messages: '/messages'
    } 
}

export default Config
