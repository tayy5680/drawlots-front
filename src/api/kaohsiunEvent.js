import request from '@/api/request'

// 取得可抽獎次數
export const getActivityDrawlotsGetSpins = (input) => {
  const url = `Activity/drawlots/${input.activityId}/GetSpins`
  const method = 'get'
  return request({
    method,
    url,
    noCache: true,
  })
}

// 抽獎
export const postActivityDrawlotsSpin = (input) => {
  const url = `Activity/drawlots/${input.activityId}/Spin/free`
  const method = 'post'
  const data = {}
  return request({
    method,
    url,
    data,
  })
}