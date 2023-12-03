import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const getAll = () => {
  const config = {
  headers: { Authorization: token }
  }
  const request = axios.get(baseUrl, config)
  return request.then(response => response.data)
}

const create = async newObject => {
  const config = {
    headers: { Authorization: token }
  }
  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

const setToken = newToken => {
  token = `Bearer ${newToken}`  
}

export default { getAll, setToken, create }
