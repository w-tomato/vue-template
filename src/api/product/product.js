import request from '@/utils/request'

export function getList(data) {
  return request({
    url: '/product/list', method: 'get', params: data
  })
}

export function getDetail(data) {
  return request({
    url: '/product/get', method: 'get', params: data
  })
}

export function add(data) {
  return request({
    url: '/product/add', method: 'post', data: data
  })
}

export function update(data) {
  return request({
    url: '/product/update', method: 'post', data: data
  })
}

export function del(data) {
  return request({
    url: '/product/delete', method: 'post', data: data
  })
}
