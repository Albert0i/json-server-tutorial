// javascript for index.html
const container = document.querySelector('.blogs')
const searchForm = document.querySelector('.search')
import { HOST_URI } from './conn.js'

const renderPosts = async (term) => {
    let uri = HOST_URI + '?_sort=likes&_order=desc'
    if (term) {
      uri += `&q=${term}`
    }

    const res = await fetch(uri)
    const posts = await res.json()
    let template = ''    
    posts.forEach(post => {
        template += `
          <div class="post">
            <h2>${post.title}</h2>
            <p><small>${post.likes} likes</small></p>
            <p>${post.body.slice(0, 200)}</p>
            <a href="/details.html?id=${post.id}">read more...</a>
          </div>
        `
    })
    container.innerHTML = template
}
window.addEventListener('DOMContentLoaded', () => renderPosts())
searchForm.addEventListener('submit', (e) => {
  e.preventDefault()
  renderPosts(searchForm.term.value.trim())
})

/*
    typicode/json-server
    https://github.com/typicode/json-server
    
*/
