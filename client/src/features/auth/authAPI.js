import { POST, GET } from 'service'
import { checkToken } from 'utils'
import { message, notification } from 'antd'
import jwt_decode from 'jwt-decode'
const AuthAction = {
  login: async (data) => {
    try {
      const res = await POST('login', data)
      if (res.status === 200) {
        localStorage.setItem('user', JSON.stringify(res.data))
        message.success(res.data.msg)
      }
      return res.data
    } catch (error) {
      message.error(error.response.data.msg)
    }
  },
  refreshToken: async () => {
    const isLogin = localStorage.getItem('user')
    if (!isLogin) return
    try {
      const res = await GET('rf-token')
      return res.data
    } catch (error) {
      message.error(error.response.data.msg)
    }
  },
  logout: async (token) => {
    const expire = await checkToken(token)
    const new_token = expire ? expire : token
    try {
      localStorage.removeItem('user')
      const res = await GET('logout', new_token)
      if (res.status === 200) {
        message.success('Đăng xuất thành công')
      }
    } catch (error) {
      notification.error({
        message: 'Lỗi',
        description: error.response.data.msg,
        placement: 'topRight',
      })
    }
  },
}

export default AuthAction
