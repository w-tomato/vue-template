import request from '@/utils/request'

export function getList(data) {
  return request({
    url: '/order/list',
    method: 'get',
    params: data
  })
}
