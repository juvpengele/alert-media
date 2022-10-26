import Axios from 'axios';

const axios = Axios.create({
  baseURL: 'https://alert-media-backend.herokuapp.com/api'
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