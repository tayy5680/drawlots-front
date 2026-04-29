<template>
  <div :class="hasDrawlotsSpinObject ? 'block':'hidden'" 
    class="fixed flex w-full h-screen justify-center inset-0 transition-all duration-150 ease-linear" 
    @click="closeDrawlotsSpinPop">
    <div class="bg-[black] opacity-70 fixed inset-0"></div>
    <video
      v-for="(item, index) of videoList"
      :key="item.id" 
      :class="{'hidden': index !== winIndex,'ml-0 md:ml-[60px]':isVideoEnd}"
      :ref="setRefElement"
      @ended="ended"
      class="w-auto h-full py-[20px]"
      preload="auto">
      <source :src="item.url" />
    </video>
    <div 
    :class="isVideoEnd ? 'block':'hidden'"
    class="relative top-[20px] ml-[10px] cursor-pointer transition-all duration-150 ease-linear" @click="closeDrawlotsSpinPop">
      <img src="/2022Kaohsiunggogo/image/closecircle.png" width="50" height="50"/>
    </div>
  </div>
</template>
<script>
import { computed, watch, ref, inject } from 'vue'
import { useNotice } from '@/utils/use-notice/index.js'
import { ERROR_MESSAGE } from '@/configs/config.js'
import { EVENT_AWARD_LIST } from  '@/configs/config.js'
import { useStore } from '@/stores/index.js'
export default {
  name: 'capsule-pop',

  setup () {
    const store = useStore()
    const isVideoEnd = ref(true)
    // 獎品index
    const drawlotsSpinIndex = ref(0)
    const winIndex = ref(-1)
    const drawlotsSpinObject = inject('drawlotsSpinObject')
    const activityId = computed(() => store.activityId)
    const videoList = computed(() => {
      return EVENT_AWARD_LIST[activityId.value].reduce((acc, cur) => {
        return acc.concat({
          ...cur,
          url: import.meta.env.BASE_URL + cur.url,
        })
      }, [])
    } )
    const hasDrawlotsSpinObject = computed(() => drawlotsSpinObject.value.length >0)
    // 刪除並關閉當前獎勵畫面。
    const closeDrawlotsSpinPop = () => {
      if (isVideoEnd.value) {
        drawlotsSpinIndex.value ++
        if(drawlotsSpinObject.value[drawlotsSpinIndex.value]) {
          getVideoIndex()
        }else{
          drawlotsSpinIndex.value = 0
          drawlotsSpinObject.value = []
        }
        
      }
    }
    
    const getVideoIndex = () => {
      if (hasDrawlotsSpinObject.value) {
        winIndex.value = videoList.value.findIndex((element) => element.id === drawlotsSpinObject.value[drawlotsSpinIndex.value].id)
        if(winIndex.value >= 0){
          showResult()
        } else {
          // 沒有對應影片時,顯示銘謝惠顧訊息
          useNotice({ type: 'error', message: ERROR_MESSAGE(activityId.value,'spin','thanks') })
          closeDrawlotsSpinPop()
        }
      }
    }
    watch(drawlotsSpinObject,() => {
      getVideoIndex()
    })

    const showResult = () => {
      try {
        const myvideo = videoRef.value[winIndex.value]
        myvideo.load()
        myvideo.play()
        isVideoEnd.value = false
      } catch(e){
        useNotice({ type: 'error', message: ERROR_MESSAGE(activityId.value,'spin','winIndexNotFound') })
        closeDrawlotsSpinPop()
      }
    }
    const videoRef = ref([])
    const setRefElement = (el) =>{
      videoRef.value.push(el)
    }
    const ended = () => {
      isVideoEnd.value = true
    }

    return {
      closeDrawlotsSpinPop,
      hasDrawlotsSpinObject,
      videoList,
      winIndex,
      setRefElement,
      ended,
      isVideoEnd,
    }
  },
}
</script>