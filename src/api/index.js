import request from '@/api/request'

// 登入
export const postTokenLogin = (inputData) => {
  const url = 'Token/Login'
  const method = 'post'
  const data = {
    account: inputData.account,
    password: inputData.password,
    reCAPTCHA: '',
  }

  return request({
    method,
    url,
    data,
  })
}

// 扭蛋

