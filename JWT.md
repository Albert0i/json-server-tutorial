# JWT

![alt The Twilight Zone](img/The_Twilight_Zone.JPG)

## Forward
> "There is a fifth dimension, beyond that which is known to man. It is a dimension as vast as space and as timeless as infinity. It is the middle ground between light and shadow, between science and superstition, and it lies between the pit of man's fears and the summit of his knowledge. This is the dimension of imagination. It is an area which we call [The Twilight Zone](https://www.imdb.com/title/tt0052520/)."

## I. To prepare
> [JSON Web Token](https://jwt.io/introduction) (JWT) is an open standard (RFC 7519) that defines a compact and self-contained way for securely transmitting information between parties as a JSON object. This information can be verified and trusted because it is digitally signed. JWTs can be signed using a secret (with the HMAC algorithm) or a public/private key pair using RSA or ECDSA.

```bash   
npm run jsonwebtoken
npm run dotenv
```

package.json
```json
{
  "name": "json-server-tutorial",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "json-server": "json-server data/db.json --watch --port 3000 --static ./",
    "json-dynamic": "json-server js/generate.js --port 3000 --static ./",
    "json-simple": "nodemon js/jsonSimple",

    "auth": "nodemon js/authServer",
    "json-auth": "nodemon js/jsonAuth"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "devDependencies": {
    "@faker-js/faker": "^7.5.0",
    "json-server": "^0.17.0",
    "lodash": "^4.17.21"
  },
  "dependencies": {
    "dotenv": "^16.0.2",
    "jsonwebtoken": "^8.5.1"
  }
}
```

authServer.js
```javascript
// authServer.js
require('dotenv').config()
const express = require('express')
const app = express()
const jwt = require('jsonwebtoken')
const port = process.env.AUTH_PORT || 3000

app.use(express.json())
let refreshTokens = []

app.post('/login', (req, res) => {
  console.log('login user is', req.body.username, ', password is ', req.body.password)

  const username = req.body.username
  const password = req.body.password
  // Check username and password against database

  const user = { username }
  const accessToken = generateAccessToken(user)
  
  refreshToken = generateRefreshToken(user)
  refreshTokens.push(refreshToken)

  res.json({ accessToken, refreshToken })
})
app.post('/token', (req, res) => {
  console.log('token is', req.body.token)

  const refreshToken = req.body.token
  if (refreshToken == null) return res.sendStatus(401)   // No token 
  if (!refreshTokens.includes(refreshToken)) return res.sendStatus(403) // Invalid token
  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403) // Invalid token 

    console.log('token user is', user)
    const accessToken = generateAccessToken({ username: user.username })
    return res.json({ accessToken })
  })
})

app.delete('/logout', (req, res) => {
  refreshTokens = refreshTokens.filter(token => token !== req.body.token)
  res.sendStatus(204)   // No Content
})

function generateAccessToken(user, defaultExpiry = '60s') {
  return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: defaultExpiry
  })
}
function generateRefreshToken(user, defaultExpiry = '1800s') {
  return jwt.sign(user, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: defaultExpiry
  })
}

app.listen(port, () => {
  console.log(`Auth Server is running on port ${port}`)
})
```

jsonAuth.js
```javascript
// jsonAuth.js
require('dotenv').config()
const jsonServer = require('json-server')
const server = jsonServer.create()
const router = jsonServer.router('data/db.json')
const middlewares = jsonServer.defaults()
const jwt = require('jsonwebtoken')
const port = process.env.SERVER_PORT || 3000

server.use(middlewares)
server.use(authenticateToken)
server.use(router)
server.listen(port, () => {
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
```


## II. To put in work 
Run simple JSON Server on port 3000 (no authentication)
```bash
npm run json-simple 
```
or run JSON Server with JWT authentication enabled on port 3000, Auth Server on port 4000. 
```bash
npm run auth 
npm run json-auth
```

Login
```bash
POST http://localhost:4000/login
Content-Type: application/json

{
  "username": "Kyle",
  "password": "123456"
}
```

Get Posts
```bash
GET http://localhost:3000/posts/1
Content-Type: application/json
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Ikt5bGUiLCJpYXQiOjE2NjM4MzAzNzYsImV4cCI6MTY2MzgzMDQzNn0.LLzXnDo47BmiXab5q2JfBuJeNNjN5f4AEBgqhPsmjxY
```

Refresh Token
```bash
POST http://localhost:4000/token
Content-Type: application/json

{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Ikt5bGUiLCJpYXQiOjE2NjM4MzAyMDEsImV4cCI6MTY2MzgzMjAwMX0.vm2h6EG1SIKKeMetBzTqaPb9HxO5-0IXjN8dZfeDil0"
}
```

Logout
```bash
DELETE http://localhost:4000/logout
Content-Type: application/json

{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Ikt5bGUiLCJpYXQiOjE2NjM4MzAyMDEsImV4cCI6MTY2MzgzMjAwMX0.vm2h6EG1SIKKeMetBzTqaPb9HxO5-0IXjN8dZfeDil0"
}
```


## III. To Round up
![alt jwt](img/jwt.JPG)


## IV. Reference
1. [What Is JWT and Why Should You Use JWT](https://www.youtube.com/watch?v=7Q17ubqLfaM)
2. [JWT Authentication Tutorial - Node.js](https://www.youtube.com/watch?v=mbsmsi7l3r4)
3. [typicode/json-server](https://github.com/typicode/json-server)
4. [auth0/node-jsonwebtoken](https://github.com/auth0/node-jsonwebtoken#readme)
5. [REST Client](https://marketplace.visualstudio.com/items?itemName=humao.rest-client)

## Appendix
.env
```bash
ACCESS_TOKEN_SECRET=d39649e3c0aa83edce19c8844e5a60089ca66999c31bb8fd299ba56055d74eadebb1808e51dd4b9b5421900540f2a8afe8a365e5df264ad6f471e49e109074ab

REFRESH_TOKEN_SECRET=7722eb7cbfca2c1193fb1a09517a921cd1c45f2bf23798d42776540fedd814be55988373a5a6d22990efadda319e74601d8e98a5b3ff0d56af114f6b8cd12a85
#
# Open up a terminal and run 'node' and type in: 
# > require('crypto').randomBytes(64).toString('hex')
# 

# JWT 
SERVER_PORT=3000
AUTH_PORT=4000
```


## EOF (2022/09/22)