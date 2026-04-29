<template>
  <viewEvent 
    :apiGetSpin='apiGetSpin'
    :apiPostSpin='apiPostSpin'
  />
  <div class="fixed inset-0 -z-1 bg-[#141414] fixed flex items-center justify-center">
    <div class="bgImage ff h-screen w-full bg-no-repeat bg-contain bg-center"></div>
  </div>
</template>

<script>
import viewEvent from '@/components/viewEvent/index.vue'
import { useStore } from '@/stores/index.js'
import { getActivityDrawlotsGetSpins, postActivityDrawlotsSpin } from '@/api/kaohsiunEvent.js'
import { ERROR_MESSAGE } from  '@/configs/config.js'
import { useNotice } from '@/utils/use-notice/index.js'

export default {
  name:'kaohsiunggogo-2022',
  components: {
    viewEvent,
  },
  setup() {
    const activityId = import.meta.env.VITE_ACTIVITY_ID
    const store = useStore()

    // api GetSpins
    const apiGetSpin = () => {
      return getActivityDrawlotsGetSpins({activityId:activityId})
        .then((res) => {
          const result = {
            freeRemains: res.Data.FreeRemains
          }
          return result
        })
        .catch(err => {
          useNotice({ type: 'error', message: ERROR_MESSAGE(activityId,'getSpin',err.Code) })
          if(err.Code === '401' || err.Code === 'http-401') {
            localStorage.removeItem('userToken')
            store.setLoginStatus()
          }
        })
    }
    //api PostSpin
    const apiPostSpin = () => {
      return postActivityDrawlotsSpin({activityId:activityId})
        .then((res) => {
          const result = []
          res.Data[0]?.Prizes.forEach((item) => {
            result.push({
              id: parseInt(item.PrizeTypeID),
              name:item.PrizeName,
            })
          })
          return result
        })
        .catch(err => {
          useNotice({ type: 'error', message: ERROR_MESSAGE(activityId,'spin',err.Code) })
        })
    }
    return {
      apiGetSpin,
      apiPostSpin,
    }
  }
}
</script>


<style>
.bgImage{
  background-image: url('/2022Kaohsiunggogo/image/bg.png');
}
</style>