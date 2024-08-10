import request from './http'

import * as T from './types'

const loginApi: T.ILoginApi = {
  login(params) {
    return request({
      url: '/login',
      method: 'post',
      data: params
    })
  },
  userInfo(params) {
    return request({
      url: '/userInfo',
      method: 'get',
      params
    })
  },
  setUserInfo(params) {
    return request({
      url: '/upDateInfo',
      method: 'post',
      data: params
    })
  },
  upImages(params) {
    return request({
      url: '/upImages',
      method: 'post',
      data: params
    })
  }
}
export default loginApi