import axios from 'axios'

axios.defaults.baseURL = 'https://api.fullstackweekly.com'

axios.interceptors.request.use(function (config) {
  if (typeof window === 'undefined') {
    return config
  }

  const token = window.localStorage.getItem('token')

  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }

  return config
})

const appService = {
  getPosts (categoryID) {
    return new Promise(resolve => {
      axios.get(`/wp-json/wp/v2/posts?categories=${categoryID}&per_page=6`)
        .then(response => {
          resolve(response.data)
        })
    })
  },
  login (credentials) {
    return new Promise((resolve, reject) => {
      axios.post('/services/auth.php', credentials)
        .then(response => {
          resolve(response.data)
        }).catch(response => {
          reject(response.status)
        })
    })
  },
  getProfile () {
    return new Promise(resolve => {
      axios.get('/services/profile.php')
        .then(response => {
          resolve(response.data)
        })
    })
  }
}

export default appService
