import axios from 'axios'

/**
 * Instancia de Axios preconfigurada para enviar formularios a Formspree.
 * La baseURL evita repetir el endpoint en cada petición.
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
