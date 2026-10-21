import axios from 'axios'

const axiosInstance = axios.create()

axiosInstance.interceptors.response.use(
  (response) => response,

  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('accessToken')
      window.location.href = '/'
    }

    return Promise.reject(error)
  }
)

export default axiosInstance