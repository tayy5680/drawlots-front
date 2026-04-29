import { defineStore } from 'pinia'

export const useStore = defineStore('main', {
  state: () => {
    return {
      isLogin: false,
      activityId:'',
    }
  },

  actions: {
    setLoginStatus () {
      this.isLogin = !!JSON.parse(localStorage.getItem('userToken'))
    },
    setActivityId (activityID) {
      this.activityId = activityID
    }
  }
})