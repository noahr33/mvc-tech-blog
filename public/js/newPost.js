const form = document.getElementById('newblog')
const titleInput = document.getElementById('blog-post-title')
const blogTextInput = document.getElementById('blogtextInput')

form.addEventListener('submit', (event) => {
  event.preventDefault()
  const blogData = {
    blog_title: titleInput.value,
    content: blogTextInput.value
  }

  fetch('/dashboard', {
    method: 'post',
    header: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(blogData)
  })
    .then(response => {
      if (response.status === 200) {
        window.location.reload()
      }
    })
    .catch(err => console.log(err))
})