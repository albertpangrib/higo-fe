import axios from "axios";

const api = axios.create({
    baseURL: 'https://higo-be.onrender.com/api',
    headers: {
      Accept: 'application/json'
    }
  })
  
api.defaults.headers.post['Content-Type'] = 'application/json'
  
export default api;