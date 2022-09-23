// authServer.js
require('dotenv').config()
const express = require('express')
const app = express()
const jwt = require('jsonwebtoken')
const cors = require("cors");
const port = process.env.AUTH_PORT || 3000

app.use(express.json())
app.use(cors({}));
let refreshTokens = []

app.post('/login', (req, res) => {
  console.log('login user is', req.body.username, ', password is ', req.body.password)

  const username = req.body.username
  const password = req.body.password
  // Check username and password against database

  const user = { username }
  const accessToken = generateAccessToken(user)
  //const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET)
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

/**
    HTTP response status codes
    https://developer.mozilla.org/en-US/docs/Web/HTTP/Status

 */