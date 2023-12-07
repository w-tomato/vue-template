import request from '@/utils/request'

// 购物车API
export function listCart(params) {
  return request({
    url: '/shoppingCart/list',
    method: 'get',
    params: params
  })
}

export function addCart(data) {
  return request({
    url: '/shoppingCart/add',
    method: 'post',
    data: data
  })
}

export function deleteCart(id) {
  return request({
    url: '/shoppingCart/delete',
    method: 'post',
    params: { 'id': id }
  })
}

export function updateCart(data) {
  return request({
    url: '/shoppingCart/update',
    method: 'post',
    data: data
  })
}

export function submitCart(data) {
  return request({
    url: '/shoppingCart/submit',
    method: 'post',
    data: data
  })
}
