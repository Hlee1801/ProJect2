import jwt_decode from 'jwt-decode'
import axios from 'axios'
import moment from 'moment'

export async function checkToken(token) {
  const decode = jwt_decode(token)
  if (decode.exp > Date.now() / 1000) return
  const res = await axios.get('/api/rf-token')
  return res.data.access_token
}
export function timeBetween(d1, d2) {
  const start = new Date(d1)
  const end = new Date(d2)
  const utc1 = Date.UTC(start.getFullYear(), start.getMonth(), start.getDate())
  const utc2 = Date.UTC(end.getFullYear(), end.getMonth(), end.getDate())
  const diffTime = Math.abs(utc2 - utc1)
  return Math.floor(diffTime / (1000 * 60 * 60 * 24))
}
export const disabledDate = (current) => {
  return current && current + 1 <= moment().endOf('day')
}
