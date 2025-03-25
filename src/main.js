// import '/style.css'
import '../style.css'
// import { mockUser, mockPosts } from './data.js'
import { users } from './data/users.js'
import { posts } from './data/posts.js'
import { messages } from './data/messages.js'

const app = document.querySelector('#app')

function renderPostForm() {
    return `
        <div class="post-form">
            <textarea id="postInput" rows="3" placeholder="Share your latest send, climb, or beta... 🧗‍♀️"></textarea>
            <button id="submitPost">Post</button>
        </div>
    `
}

function renderPost({ user, content, timestamp }) {
    return `
        <div class="post">
            <h3>@${user} · <span style="color:gray; font-size: 0.8rem">${timestamp}</span></h3>
            <p>${content}</p>
        </div>
    `
}

function renderFeed(posts) {
    return posts.map(renderPost).join('')
}

function init() {
    let currentUser = users[0]
    let currentPosts = [...posts]

    app.innerHTML = `
        <h2>Welcome to Climbing Bum 🧗‍♂️</h2>
        <p>Share your sends, projects, and climbing stories 💪</p>
        ${renderPostForm()}
        <div id="feed">${renderFeed(currentPosts)}</div>
    `

    document.getElementById('submitPost').addEventListener('click', () => {
        const input = document.getElementById('postInput')
        const newPost = {
            userId: currentUser.id,
            content: input.value,
            timestamp: 'Just now'
        }

        if (input.value.trim()) {
            currentPosts.unshift(newPost)
            document.getElementById('feed').innerHTML = renderFeed(currentPosts)
            input.value = ''
        }
    })
}

init()