// javascript for jwtDemo.html
const AUTH_URI = 'http://localhost:4000/'
const JSON_URI = 'http://localhost:3000/posts'

const username = document.querySelector('.username')
const password = document.querySelector('.password')
const accessToken = document.querySelector('.access-token')
const refreshToken = document.querySelector('.refresh-token')
const jsonResult = document.querySelector('.json-result')

const loginBtn = document.querySelector('.login')
const refreshBtn = document.querySelector('.refresh')
const logoutBtn = document.querySelector('.logout')
const getPostsBtn = document.querySelector('.get-posts')

// login 
loginBtn.addEventListener('click', (e) => {
    const doc = { username: username.value, password: password.value}
    fetch(AUTH_URI + 'login', {
        method: 'POST',
        body: JSON.stringify(doc),
        headers: { "Content-Type": "application/json"}
    })
    .then(res => res.json())
    .then(data => {
        accessToken.value = data.accessToken
        refreshToken.value = data.refreshToken
    })
    .catch(err => jsonResult.innerHTML=err.message)
  })

// refresh   
refreshBtn.addEventListener('click', (e) => {
    const doc = { token: refreshToken.value }
    fetch(AUTH_URI + 'token', {
        method: 'POST',
        body: JSON.stringify(doc),
        headers: { "Content-Type": "application/json"}
    })
    .then(res => res.json())
    .then(data => accessToken.value = data.accessToken )
    .catch(err => jsonResult.innerHTML=err.message)   
  })

// logout 
logoutBtn.addEventListener('click', (e) => {
    const doc = { token: refreshToken.value }
    fetch(AUTH_URI + 'logout', {
        method: 'DELETE',
        body: JSON.stringify(doc),
        headers: { "Content-Type": "application/json"}
    })
    .then(res => {
        accessToken.value = ''
        refreshToken.value = ''
    })
    .catch(err => jsonResult.innerHTML=err.message)   
  })

// Get Posts
getPostsBtn.addEventListener('click', (e) => {
  //alert(`accessToken=${accessToken.value}`)
  fetch(JSON_URI, {
    method: 'GET',
    headers: { "Content-Type": "application/json", 
                "Authorization": "Bearer " + accessToken.value }
  })
  .then(res => res.json())
  .then(data => jsonResult.innerHTML=JSON.stringify(data))
  .catch(err => jsonResult.innerHTML=err.message)
})
