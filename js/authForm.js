// authServer.js
require('dotenv').config()
const express = require('express')
const cookieParser = require("cookie-parser");
const methodOverride = require('method-override')
const path = require('path')
const app = express()
const jwt = require('jsonwebtoken');
const port = process.env.SERVER_PORT || 3000

app.use(express.static('.'))
app.use(express.urlencoded( {extended: true}))
app.use(cookieParser())
app.use(methodOverride('_method'))

app.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'login.html'))
})

app.post('/login', (req, res) => {
  console.log('login user is', req.body.username, ', password is ', req.body.password)

  const username = req.body.username
  const password = req.body.password
  // Check username and password against database

  const user = { username }
  const accessToken = generateAccessToken(user)

  res.cookie("access_token", accessToken, {
            httpOnly: true,
            secure: true,
  }).redirect('/form')
})

app.get('/form', authenticateToken, (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'form.html'))
})

app.delete("/logout", authenticateToken, (req, res) => {
  return res
    .clearCookie("access_token")
    .redirect('/login')
});

app.listen(port, () => {
  console.log(`Auth Server is running on port ${port}`)
})

function generateAccessToken(user, defaultExpiry = '60s') {
  return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: defaultExpiry
  })
}

// Middleware to authenticate
function authenticateToken(req, res, next) {
  const token = req.cookies.access_token;
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

/**
    HTTP response status codes
    https://developer.mozilla.org/en-US/docs/Web/HTTP/Status

    Using Cookies with JWT in Node.js
    https://dev.to/franciscomendes10866/using-cookies-with-jwt-in-node-js-8fn

 */