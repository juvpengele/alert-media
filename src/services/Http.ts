import Axios from 'axios';
console.log(import.meta.env.VITE_API_BASE_URL);
const axios = Axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api'
})

axios.interceptors.request.use((configuration) => {
  
  const auth = localStorage.getItem('auth');
  if(auth) {
    try {
      const authData = JSON.parse(auth);

      if(configuration.headers) {
        configuration.headers['Authorization'] = 'Bearer ' + authData.access_token as string;
      }
      
    } catch (error) {
      console.error('Auth has bad format')
    }
  }
  
  return configuration;
})

export { axios }