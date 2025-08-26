import axios from 'axios'

/**
 * Axios instance configured for Formspree requests.
 * Setting the baseURL allows us to make requests without
 * repeating the endpoint path in each service call.
 */
const axiosInstance = axios.create({
  baseURL: 'https://formspree.io/f/xblajzlk',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
})

export default axiosInstance
export { axiosInstance }
