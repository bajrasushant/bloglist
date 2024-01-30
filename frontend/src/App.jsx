import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import loginService from "./services/login";
import NewBlogForm from "./components/NewBlogForm";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState(null);
  const [newBlogFormVisible, setNewBlogFormVisible] = useState(false)

  useEffect(() => {
    if (user) {
      blogService.getAll().then((blogs) => setBlogs(blogs));
    }
  }, [user]);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const user = await loginService.login({ username, password });
      window.localStorage.setItem("loggedUser", JSON.stringify(user));
      blogService.setToken(user.token);
      setUser(user);
      setUsername("");
      setPassword("");
    } catch {
      setMessage({ message: "wrong credentials, try again", status: "error" });
      setTimeout(() => {
        setMessage(null);
      }, 5000);
    }
  };

  const handleLogout = () => {
    try {
      window.localStorage.removeItem("loggedUser");
      window.location.reload();
    } catch {
      setMessage({ message: "something went wrong", status: "error" });
      setTimeout(() => {
        setMessage(null);
      }, 5000);
    }
  };

  const addBlog = async (blogObject) => {
    try {
      const blog = await blogService.create(blogObject);
      setBlogs([...blogs, blog]);
      setMessage({
        message: `a new blog ${blog.title} by ${blog.author} added`,
        status: "success",
      });
      setTimeout(() => {
        setMessage(null);
      }, 5000);
    } catch (error) {
      console.log(error);
      setMessage({ message: "Something went wrong", status: "error" });
      setTimeout(() => {
        setMessage(null);
      }, 5000);
    }finally{
      setNewBlogFormVisible(false)
    }
  };

  const newBlogForm = () => {
    const hideWhenVisible = { display: newBlogFormVisible? 'none': ''}
    const showWhenVisible = { display: newBlogFormVisible? '' : 'none'}
    return (
      <div>
        <div style={hideWhenVisible}>
          <button onClick={()=>setNewBlogFormVisible(true)}>new form</button>
        </div>
        <div style={showWhenVisible}>
          <NewBlogForm 
            createBlog={addBlog}
          />
          <button onClick={() => setNewBlogFormVisible(false)}>cancel</button>
        </div>
      </div>
    )}

  const blogsComp = () => (
    <div>
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  );

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <h2>login to the application</h2>
      <div>
        username
        <input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
        <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>
  );

  const Notification = ({ message }) => {
    if (message === null) return null;
    return <div className={message.status}>{message.message}</div>;
  };

  return (
    <div>
      <Notification message={message} />
      {user === null && loginForm()}
      {user !== null && (
        <div>
          <h1>blogs</h1>
          <p>
            {user.name} is logged in
            <button onClick={() => handleLogout()}>logout</button>
          </p>
          {newBlogForm()}
          {blogsComp()}
        </div>
      )}
    </div>
  );
};

export default App;
