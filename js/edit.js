// javascript for create.html
const form = document.querySelector('form')
const id = new URLSearchParams(window.location.search).get('id')
import { HOST_URI } from './conn.js'

const renderForm = async () => {
    const res = await fetch(HOST_URI + id)
    const post = await res.json()
    const template = `
      <input type="hidden" name="id" value="${post.id}">
      <input type="hidden" name="likes" value="${post.likes}">
      <input type="text" name="title" required value="${post.title}">
      <textarea name="body" required>${post.body}</textarea>
      <button>Update</button>
    `
    form.innerHTML = template
}

const updatePost = async (e) => {
    e.preventDefault()
    const doc = {
        title: form.title.value, 
        body: form.body.value,
        likes: form.likes.value
    }
    await fetch(HOST_URI + id, {
        method: 'PUT',
        body: JSON.stringify(doc),
        headers: { "Content-Type": "application/json"}
    })
    window.location.replace('/index.html')
}

window.addEventListener('DOMContentLoaded', ()=> renderForm())

form.addEventListener('submit', updatePost)