// jsonAuth.js
require('dotenv').config()
const jsonServer = require('json-server')
const server = jsonServer.create()
const router = jsonServer.router('data/db.json')
const middlewares = jsonServer.defaults()
const jwt = require('jsonwebtoken')
const port = process.env.SERVER_PORT || 3000

server.use(middlewares)
// server.use((req, res, next) => {
//  if (isAuthorized(req)) { // add your authorization logic here
//    next() // continue to JSON Server router
//  } else {
//    res.sendStatus(401)
//  }
// })
server.use(authenticateToken)
server.use(router)
server.listen(3000, () => {
  console.log(`JSON Server is running on port ${port}`)
})

// Middleware to authenticate
function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization']
  // Bearer TOKEN
  const token = authHeader && authHeader.split(' ')[1]
  if (token == null) return res.sendStatus(401)   // No token

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {    
    console.log('authenticate user is', user)
    if (err) 
    { 
      console.log('err.message is', err.message)
      return res.sendStatus(403)           // Invalid token  
    }
    req.user = user    
    next()
  })
}

/*
   typicode/json-server
   https://github.com/typicode/json-server

*/