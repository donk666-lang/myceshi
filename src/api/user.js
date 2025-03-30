import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/vue-admin-template/user/login',
    method: 'post',
    data
  })
}

export function getInfo(token) {
  return request({
    url: '/vue-admin-template/user/info',
    method: 'get',
    params: { token }
  })
}

export function logout() {
  return request({
    url: '/vue-admin-template/user/logout',
    method: 'post'
  })
}
// 获取顶部搜索
export function getSelectData() {
  return request({
    url: '/weeesys/stat/getSelectData',
    method: 'get'
  })
}
// 获取顶部数值
export function getTopData() {
  return request({
    url: '/weeesys/stat/getTop',
    method: 'get'
  })
}
// 获取折线图数据
export function getMiddleLeft() {
  return request({
    url: '/weeesys/stat/getMiddleLeft',
    method: 'get'
  })
}