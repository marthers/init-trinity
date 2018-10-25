import axios from '@/libs/api.request'
export const login = ({ userName, password }) => {
  const data = {
    userName,
    password
  }
  return axios.request({
    url: 'login',
    data,
    method: 'post'
  })
}

export const getUserInfo = (token) => {
  return axios.request({
    url   : 'get_info',
    params: {
      token
    },
    method: 'get'
  })
}

export const signOut = () => {
  return axios.request({
    url   : 'http://192.168.50.154:8090/trinity-backstage-account/user/sign_out_web',
    method: 'post'
  })
}
