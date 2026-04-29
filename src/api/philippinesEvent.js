import request from '@/api/request'

// 取得可抽獎次數
export const getActivityDrawlotsGetSpins = (input) => {
  const url = `Drawlots/GetSpins?activityId=${input.activityId}`
  const method = 'get'
  return request({
    method,
    url,
    noCache: true,
  })
}

// 抽獎
export const postActivityDrawlotsSpin = () => {
  const url = `Drawlots/Spin`
  const method = 'post'
  const data = {}
  return request({
    method,
    url,
    data,
  })
}