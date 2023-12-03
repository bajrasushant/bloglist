import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const [message, setMessage] = useState(null)

  useEffect(() => {
    if(user) {
      blogService.getAll().then(blogs =>
        setBlogs( blogs )
      )  
    }
  }, [user])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if(loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])


  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({ username, password })
      window.localStorage.setItem('loggedUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch {
      setMessage({message: 'wrong credentials, try again', status: 'error'})
      setTimeout(()=> {
        setMessage(null)
        }, 5000)
    }
  }

  const handleLogout = () => {
    try {
      window.localStorage.removeItem('loggedUser')
      window.location.reload()
    } catch {
      setMessage({message: 'something went wrong', status: 'error'})
      setTimeout(()=> {
      setMessage(null)
      }, 5000)
    }
  }

  const handleNewBlog = async (event) => {
    event.preventDefault()
    try {
      const blog = await blogService.create({ title, author, url })
      setBlogs([...blogs, blog])
      setTitle('')
      setAuthor('')
      setUrl('')
      setMessage({message: `a new blog ${blog.title} by ${blog.author} added`, status: 'success'})
      setTimeout(()=> {
      setMessage(null)
      }, 5000)
    } catch {
      setMessage({message: 'something went wrong', status: 'error'})
      setTimeout(()=> {
      setMessage(null)
      }, 5000)
    }
  }


  const blogsComp = () => (
    <div>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <h2>login to the application</h2>
      <div>
        username<input type="text" value={username} name="Username" onChange={({target}) => setUsername(target.value)} />
      </div>
      <div>
        password<input type="password" value={password} name="Password" onChange={({target}) => setPassword(target.value)} />
      </div>
      <button type="submit">login</button>
    </form>
  )

  const newBlogForm = () => (
    <form onSubmit={handleNewBlog}> 
      <h2>create new</h2>
      <div>
        title:<input type="text" name="Title" value={title} onChange={({target}) => setTitle(target.value)} />
      </div>
      <div>
        author:<input type="text" name="Author" value={author} onChange={({target}) => setAuthor(target.value)} />
      </div>
      <div>
        url:<input type="text" name="URL" value={url} onChange={({target}) => setUrl(target.value)} />
      </div>
      <button type="submit">create</button>
    </form>
  )

  const Notification = ({message}) => {
    if (message===null) return null
    return (
    <div className={message.status}>
    {message.message}
    </div>
    )
  }


  return (
    <div>
      <Notification message={message} />
      {user === null && loginForm()}
      {user !== null && <div>
      <h1>blogs</h1>
        <p>{user.name} is logged in<button onClick={()=>handleLogout()}>logout</button></p>
        {newBlogForm()}
        {blogsComp()}
      </div>
      }
    </div>
  )
}

export default App
