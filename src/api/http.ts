import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'
import { ElLoading, ElMessage } from 'element-plus'

const service = axios.create({
  baseURL: process.env.NODE_ENV === 'development' ? '/api' : process.env.VUE_APP_BASE_API,
  timeout: 600000 // request timeout
})
const loadingOptions = {
  lock: true,
  text: 'Loading',
  spinner: 'el-icon-loading',
  background: 'hsla(0,0%,100%,.9)',
};

// 有效的state 0  - 200
const isSatusValid = function (statusCode?: number) {
  return statusCode && statusCode >= 0 && statusCode < 300;
};

// 携带请求头
service.interceptors.request.use(
  (config): AxiosRequestConfig<any> => {
    const token = window.sessionStorage.getItem('token')
    if (token) {
      //@ts-ignore
      // config.headers.token = token
    }
    ElLoading.service(loadingOptions)
    return config
  },
  (error) => {
    console.error(error); // for debug
    return Promise.reject(error);
  }
)

// 响应拦截
service.interceptors.response.use(
  (response: AxiosResponse) => {
    ElLoading.service(loadingOptions).close();
    const { status, data } = response
    //处理 请求状态  0   200  成功 其他 失败 
    if (isSatusValid(status)) {
      return data
    }
    ElMessage({
      message: data.msg || data.message || 'Error',
      type: 'error',
    })

  },
  (error) => {
    ElLoading.service(loadingOptions).close();
    console.error(error); // for debug
    
    ElMessage({
      message: error || 'Error',
      type: 'error',
    })
    return Promise.reject(error);
  })



export default service