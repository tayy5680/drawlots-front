import axios from 'axios'
import { deepCopy } from '@/utils'

export const TIMEOUT = 10000

const DEFAULT_CACHE_EXPIRY_TIME = 3000
const CACHE = Object.create(null)
const getCacheId = ({ url, params }) => {
  let id = ''
  try {
    id += url
    id += JSON.stringify(params)
  } catch (err) {
    console.log(err)
  }
  return id
}
var instance = null

export const setInstance = (paramsToken) => {
  const CONFIG = {
    baseURL: import.meta.env.VITE_API_PROXY === 'true' ? '/api/' : import.meta.env.VITE_API_URL,
    timeout: TIMEOUT,
  }
  instance = axios.create(CONFIG)
  
  instance.interceptors.request.use(
    config => {
      // before request is sent
      const token = paramsToken ?? ''
      if (token && config.url !== 'Token/SignIn') {
        config.headers.Authorization = `Bearer ${token}`
      }
      return config
    },
    error => {
      // request error
      return Promise.reject(error)
    },
  )
  
  instance.interceptors.response.use(
    async response => {
      // Do something with response data
      const RESPONSE_SUCCESS = response?.data?.Status?.Code === '0'
  
      // cache機制 是否存入
      if (RESPONSE_SUCCESS && response.config.method === 'get') {
        const CACHE_ID = getCacheId({ url: response.config.url, params: response.config.params })
        CACHE[CACHE_ID] = response.data
        // 過期時清除
        setTimeout(() => { CACHE[CACHE_ID] = undefined }, DEFAULT_CACHE_EXPIRY_TIME)
        try {
          // 因為資料可能是 pass by reference 避免於 service 或 pages 更改資料
          return deepCopy(await CACHE[CACHE_ID])
        } catch (error) {
          // 避免有些資料無法 deepCopy
          return CACHE[CACHE_ID]
        }
      } else if (RESPONSE_SUCCESS) {
        return response.data
      }
  
      // token無效
      // if (['1003'].includes(response?.data?.Status?.Code)) {
      //   store.dispatch('member/signOut')
      //     .then(() => {
      //       useNotice({ type: 'info', message: '您已成功登出' })
      //       store.dispatch('platform/setDefault')
      //     })
      //     .catch(() => {
      //       useNotice({ type: 'error', message: '發生錯誤，請稍後再試，或洽客服人員' })
      //     })
      //     // 可能目前在需要權限的頁面
      //     .finally(() => {
      //       router.push({ name: 'home' })
      //     })
      // }
      const rejectObj = {
        Code: response?.data?.Status?.Code ?? '',
        Message: response?.data?.Status?.Message ?? '',
        Data: {
          ...response?.data?.Data,
          // 不屬於Data的部分 但登入流程可能用到
          access_token: response?.data?.access_token,
          refresh_token: response?.data?.refresh_token,
        },
      }
      return Promise.reject(rejectObj)
    },
    error => {
      // 處理 timeout
      if (error && error.stack.indexOf('timeout') > -1) {
        return Promise.reject({
          Code: 'timeout',
        })
      }
      if (error.response) {
        // 處理 HTTP Status Code
        switch (error.response.status) {
          // 若不需處理 則reject Code前綴為http-
          default:
            return Promise.reject({
              Code: `http-${error.response.status}`,
            })
        }
      }
      // 網路問題例如斷線
      if (!window.navigator.onLine) {
        // TODO: 這邊需要設計斷線的錯誤
        return
      }
      return Promise.reject(error)
    },
  )
}
/**
 * @param {string} method http的request methods
 * @param {string} url 同axios的url
 * @param {object} data axios收的params或data(依method決定)
 * @param {number} timeout(optional) 同axios config中的timeout
 * @param {number} noCache(optional) method為get 且傳入true時 不使用既有的快取
 */
export default async function ({
  method = '',
  url = '',
  data,
  timeout,
  noCache,
}) {
  const config = {
    timeout,
    noCache,
  }
  const CACHE_ID = getCacheId({ url, params: data })
  method = method.toLowerCase()
  switch (method) {
    case 'get':
      // cache機制 檢查是否取出
      if (!noCache && CACHE[CACHE_ID] !== undefined) {
        try {
          // 資料可能是 pass by reference 需注意
          return deepCopy(await CACHE[CACHE_ID])
        } catch (error) {
          // 避免有些資料無法 deepCopy
          return CACHE[CACHE_ID]
        }
      }
      return instance.get(url, { params: data }, config)
    case 'post':
      return instance.post(url, data, config)
    case 'delete':
      config.params = data
      return instance.delete(url, config)
    case 'put':
      return instance.put(url, data, config)
    case 'patch':
      return instance.patch(url, data, config)
    default:
      // TODO: 這邊設計未知method的錯誤
      return Promise.reject()
  }
}
