const app = require('../app')
const supertest = require('supertest')
const mongoose = require('mongoose')
const Blog = require('../models/blog')
const helper = require('./test_helper')

const api = supertest(app)


beforeEach(async () => {
  await Blog.deleteMany({})
  let blogObject = new Blog(helper.initialBlogs[0])
  await blogObject.save()
  blogObject = new Blog(helper.initialBlogs[1])
  await blogObject.save()
})


describe('GET testing', () => {
  test('all blogs are returned', async () => {
    const response = await api.get('/api/blogs/')
    expect(response.body).toHaveLength(helper.initialBlogs.length)
  })

  test('unique identifier is named id', async () => {
    const response = await api.get('/api/blogs/')
    const item = response.body[0]
    expect(item.id).toBeDefined()
  })
})

describe('POST testing', () => {
  test('POST request testing', async () => {
    const newBlog = 
      {
        title: "test",
        author: "test",
        url: "test.com",
        likes: 5,
      }
    const response = await api.post('/api/blogs/')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    // verifying length
    const blogsAtEnd = await api.get('/api/blogs/')
    expect(blogsAtEnd.body).toHaveLength(helper.initialBlogs.length + 1)

    // verifying content added
    const addedBody = blogsAtEnd.body.find(blog => blog.id === response.body.id)
    expect(addedBody.title).toBe(newBlog.title)
    expect(addedBody.author).toBe(newBlog.author)
    expect(addedBody.url).toBe(newBlog.url)
  })

  test("no likes property will default to 0", async () => {
    const newBlog = {
      title: 'test',
      author: 'test',
      url: 'test.com'
    }
    const response = await api.post('/api/blogs/')
      .send(newBlog)
      .expect(201)
    expect(response.body.likes).toBe(0)
  })

  test('no accept no title or url', async () => {
    const newBlogs = [{
      author: 'test'
    },
      {
        title: 'test',
        author: 'test',
      },
      {author: 'test',
        url: 'test.com'
      }]

    const resObjects = await Promise.all(
      newBlogs.map(blog => {
        return api.post('/api/blogs/').send(blog)
      })
    )
    resObjects.forEach(pro => expect(pro.status).toBe(400))
  })

})

describe('DELETE testing', () => {
  test('Deleting', async () => {
    const blogsAtFirst = await helper.blogsInDb()
    const idBlogsToDel = blogsAtFirst[0].id

    api.delete(`/api/blogs/${idBlogsToDel}`).expect(204)
  })
})

describe('PUT testing', () => {
  test('Updating data', async () => {
    const blogsAtFirst = await helper.blogsInDb()
    const updatedBlog = {
      title: 'test',
      author: 'Sushant Bajracharya',
    } 
    await api.put(`/api/blogs/${blogsAtFirst[0].id}`)
      .send(updatedBlog)
      .expect(204)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd[0].author).toBe(updatedBlog.author)
    expect(blogsAtEnd).toHaveLength(blogsAtFirst.length)
  })
})


afterAll(async () => {
  await mongoose.connection.close()
  })
