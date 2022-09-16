// javascript for details.html
const container = document.querySelector('.details')
const editBtn = document.querySelector('.edit')
const deleteBtn = document.querySelector('.delete')
const id = new URLSearchParams(window.location.search).get('id')
import { HOST_URI } from './conn.js'

const renderDetails = async () => {
    const res = await fetch(HOST_URI + id)
    const post = await res.json()
    const template = `
      <div>
        <h2>${post.title}</h2>
        <p>${post.body}</p>
      </div>  
    `
    container.innerHTML = template
}

window.addEventListener('DOMContentLoaded', ()=> renderDetails())

editBtn.addEventListener('click', async (e) => {
  window.location.replace('/edit.html?id=' + id)
})

deleteBtn.addEventListener('click', async (e) => {
  const res = await fetch(HOST_URI + id, {
    method: 'DELETE'
  })
  window.location.replace('/index.html')
})

/*
    URL API | URLSearchParams
    https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams

*/