// 导入axios
import axios from 'axios'
import { ElMessage } from 'element-plus'

const request = axios.create({
  // 配置基础路径
  baseURL: import.meta.env.VITE_BASE_API,
  timeout: 5000, // 请求超时
})
// 请求拦截器
request.interceptors.request.use((config) => {
  // config配置对象，headers属性请求头，经常给服务器端携带公共参数
  // 返回配置对象
  return config
})

// 响应拦截器
request.interceptors.response.use(
  (response) => {
    // 简化数据
    return response.data
  },
  (error) => {
    // 定义一个变量：存储网络错误信息
    let message = ''
    // http状态码
    let status = error.response.status
    switch (status) {
      case 401:
        message = 'TOKEN过期'
        break
      case 403:
        message = '你无权访问'
        break
      case 404:
        message = '请求地址错误'
        break
      case 500:
        message = '服务器出现问题'
      default:
        message = '网络出现问题'
        break
    }
    // 提示错误信息
    ElMessage({
      type: 'error',
      message,
    })

    // 错误处理
    return Promise.reject(error)
  },
)

// 对外暴露
export default request
