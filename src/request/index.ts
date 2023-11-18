import axios, {AxiosInstance, InternalAxiosRequestConfig, AxiosResponse, AxiosInterceptorManager} from 'axios'
// export const baseURL = 'http://localhost:8000'
export const baseURL = 'http://192.168.0.107:8000'
const request: AxiosInstance = axios.create({
  baseURL,
  timeout: 10000
})

// 请求拦截器
request.interceptors.request.use( config=> {
  return config
}, error => {
  return Promise.reject(error)
})

// 响应拦截器
request.interceptors.response.use( (res)=> {
  return new Promise((resolve, reject)=> {
    if([200, 201].indexOf(res.status) > -1 ) resolve(res)
    else reject(res)
  })
}, error=> {
  return Promise.reject(error)
})
export default request

