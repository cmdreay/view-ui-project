import axios from 'axios'
import config from '../config/config'
import { Message } from 'view-design';
// 创建axios实例
let service =  axios.create({
  baseURL: config.BASE_API, // api的base_url
  timeout: 5000 // 请求超时时间
})
// request拦截器
service.interceptors.request.use(config => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers = {
      'Authorization' : "Bearer " + token, //携带权限参数
     };
  }
  return config
}, error => {
  Promise.reject(error)
})

// respone拦截器
service.interceptors.response.use(
  response => {
   /**
    * code:200,接口正常返回;
    */
    const res = response.data
    if (res.code !== 0) {
        Message.error(res.msg);
      return Promise.reject('error')
    } else { // res.code === 200,正常返回数据
        return response.data
    }
  },
  error => {
    console.log(error)
    return Promise.reject(error)
  }
)

export default service