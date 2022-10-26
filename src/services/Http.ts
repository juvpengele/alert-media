import Axios from 'axios';

const axios = Axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'https://alert-media-backend.herokuapp.com/'
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