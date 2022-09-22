// jsonSimple.js
require('dotenv').config()
const jsonServer = require('json-server')
const server = jsonServer.create()
const router = jsonServer.router('data/db.json')
const middlewares = jsonServer.defaults()
const port = process.env.SERVER_PORT || 3000

server.use(middlewares)
server.use(router)
server.listen(port, () => {
  console.log(`JSON Server is running on port ${port}`)
})

/*
   typicode/json-server
   https://github.com/typicode/json-server

*/