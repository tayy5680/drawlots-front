import dayjs from 'dayjs'

export const EVENT_AWARD_LIST = {
  '2022Kaohsiunggogo': [
    { id: 1001, name: '300點數卡', url: '2022Kaohsiunggogo/video/v01.mov' },
    { id: 1002, name: '500點數卡', url: '2022Kaohsiunggogo/video/v02.mov' },
    { id: 1003, name: '礦寵卡', url: '2022Kaohsiunggogo/video/v03.mov' },
    { id: 1004, name: '限量馬克杯', url: '2022Kaohsiunggogo/video/v04.mov' },
    { id: 1005, name: '限量發光手環', url: '2022Kaohsiunggogo/video/v05.mov' },
    { id: 1006, name: '限量礦寵貼紙', url: '2022Kaohsiunggogo/video/v06.mov' },
    { id: 1007, name: '任天堂Switch主機', url: '2022Kaohsiunggogo/video/v06.mov' },
  ],
  '2022Philippines': [
    { id: 1, name: 'AppleWatch', url: '2022philippines/video/watch.mov' },
    { id: 2, name: 'IPad', url: '2022philippines/video/ipad.mov' },
    { id: 3, name: 'IPhone14', url: '2022philippines/video/iphone.mov' },
    { id: 4, name: 'PS5', url: '2022philippines/video/ps5.mov' },
    { id: 5, name: 'Switch', url: '2022philippines/video/switch.mov' },
    { id: 6, name: 'Xbox', url: '2022philippines/video/xbox.mov' },
    { id: 7, name: 'Tesla', url: '2022philippines/video/model.mov' },
    { id: -1, name: 'fail', url: '2022philippines/video/fail.mov' },
  ],
}

export const TODAY = dayjs()

//警告文字
export const ERROR_MESSAGE = (activityid,type, code) => {
  return ERROR_LIST[activityid]?.[type]?.[code] ?? ERROR_LIST[activityid]['other']
}

const ERROR_LIST = {
  '2022Kaohsiunggogo':{
    'other':'發生錯誤，請洽客服人員',
    'login':{
      999: '發生錯誤，帳號或密碼錯誤',
      'http-400': '發生錯誤，帳號或密碼錯誤',
    },
    'getSpin':{
      '401': '帳號發生錯誤，請重新登入',
      'http-401': '帳號發生錯誤，請重新登入',
      '9404': '抽獎次數查詢錯誤',
    },
    'spin':{
      4104: '抽獎次數用盡',
      'winIndexNotFound': '查無獎項，請洽客服人員'
    }
  },
  '2022Philippines':{
    'other':'Oops, something wrong. Please contact customer service for further assistance.',
    'spin':{
      'thanks': 'Thank you for your patronage',
    }
  },
  
}