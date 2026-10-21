import axiosInstance from './axiosInstance'

const AUTH_API_URL = 'http://localhost:8081/api/auth'

export function login(loginData) {
  return axiosInstance.post(`${AUTH_API_URL}/login`,loginData)
}

export function register(registerData) {
  return axiosInstance.post(`${AUTH_API_URL}/register`,registerData)
}