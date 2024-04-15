import axios from 'axios'

export const POST = async (url, data, token) => {
  return await axios.post(`/api/${url}`, data, {
    headers: { Authorization: token },
  })
}
export const GET = async (url, token) => {
  const controller = new AbortController()
  return await axios.get(`/api/${url}`, {
    headers: { Authorization: token },
    signal: controller.signal,
  })
}
export const PATCH = async (url, data, token) => {
  return await axios.patch(`/api/${url}`, data, {
    headers: { Authorization: token },
  })
}
export const DELETE = async (url, token) => {
  return await axios.delete(`/api/${url}`, {
    headers: { Authorization: token },
  })
}
export const PUT = async (url, data, token) => {
  return await axios.put(`/api/${url}`, data, {
    headers: { Authorization: token },
  })
}
