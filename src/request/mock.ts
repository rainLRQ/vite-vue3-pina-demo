import request from './index'

export const fetchList = (params ?: object) => {
  return request({
    url: '/mockapi/list',
    method: 'get',
    params
  })
}
export const deleteItem = (id:number) => {
  return request({
    url: '/mockapi/list/'+id,
    method: 'delete'
  })
}
export const addItem = (data: object) => {
  return request({
    url: '/mockapi/list',
    method: 'post',
    data
  })
}
export const patchItem = (id:number, data:object) => {
  return request({
    url: '/mockapi/list/' + id,
    method: 'put',
    data
  })
}
export const getTestData = () => {
  return request({
    url: '/mockapi/test',
    method: 'get'
  })
}
