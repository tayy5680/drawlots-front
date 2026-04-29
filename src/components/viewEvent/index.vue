<script>
import capsulePop from './pop.vue'
import { computed, provide, ref, watch } from 'vue'
import { useNotice } from '@/utils/use-notice/index.js'
import { useStore } from '@/stores/index.js'

export default {
  name: 'view-capsule',
  components: {
    capsulePop,
  },
  props: {
    apiGetSpin: {
      type: Function,
      default: () => null,
    },
    apiPostSpin: {
      type: Function,
      default: () => null,
    },
  },
  setup(props) {
    const store = useStore()
    const isLogin = computed(() => store.isLogin)

    const hasSpinsFrequency = computed(() => {
      if (!drawlotsGetSpinsObject.value) return 0
      return Object.entries(drawlotsGetSpinsObject.value)
        .reduce((acc, cur) => {
          if (!cur[0].includes('freeRemains')) return acc
          acc += cur[1]
          return acc
        }, 0)
    })

    const drawlotsGetSpinsObject = ref(null)
    const actionGetActivityDrawlotsGetSpins = () => {
      return props.apiGetSpin()
        .then(res => {
          drawlotsGetSpinsObject.value = res
        })
    }

    const drawlotsSpinObject = ref([])
    provide('drawlotsSpinObject', drawlotsSpinObject)
    // PLAY BUTTON
    const actionPostActivityDrawlotsSpin = async () => {
      if (!drawlotsGetSpinsObject.value.freeRemains) {
        return useNotice({ type: 'error', message: '抽獎次數用盡' })
      }
      const res = await props.apiPostSpin()
      actionGetActivityDrawlotsGetSpins()
      drawlotsSpinObject.value = res ?? []
    }

    const init = async () => {
      if(isLogin.value) await actionGetActivityDrawlotsGetSpins()
    }

    watch(isLogin, ()=>{
      init() 
    })
    init()

    // 啟動按鈕的CSS判斷
    const offsetHeight = ref(document.body.offsetHeight)
    const offsetWidth = ref(document.body.offsetWidth)
    const btnCss = ref('')
    if(offsetWidth.value/offsetHeight.value <= 1920/1080) {
      btnCss.value = 'w-[16vw] mt-[20vw] hover:w-[18vw]'
    }else{
      btnCss.value = 'w-[28vh] mt-[38vh] hover:w-[30vh]'
    }

    return {
      actionPostActivityDrawlotsSpin,
      btnCss,
      hasSpinsFrequency,
    }
  }
}
</script>

<template>
  <div class="event__entry fixed inset-0 flex items-center justify-center">
    <div class="capsule__container relative mx-auto max-w-[405px] flex flex-col items-center justify-center mb-[-28px] md:mb-0">
      <div class="capsule__bottom flex w-full items-center justify-center mt-[-28px]">
        <div @click="actionPostActivityDrawlotsSpin" 
          :class="btnCss"
          class="cursor-pointer max-w-[290px] transition-all duration-150 ease-linear">
          <img src="/2022Kaohsiunggogo/image/btn.png" :class="hasSpinsFrequency ? '' : 'filter grayscale'"/>
        </div>
      </div>
      <capsulePop/>
    </div>
  </div>
</template>
