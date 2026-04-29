<template>
  <teleport to="body">
    <viewLogin />
  </teleport>
 <router-view/>
</template>

<script>
import viewLogin from '@/components/Login.vue'
import { computed, watch } from 'vue'
import { useStore } from '@/stores/index.js'
import { setInstance } from '@/api/request.js'
import { getToken } from '@/components/viewEvent/processing.js'
export default {
  components: {
    viewLogin,
  },
  setup(){
    document.title = import.meta.env.VITE_APP_TITLE

    const store = useStore()
    const isLogin = computed(() => store.isLogin)
    const init = () => {
      store.setLoginStatus()
      const userToken = computed(() => JSON.parse(localStorage.getItem('userToken')))
      setInstance(getToken(userToken.value))
    }
    init()
    watch(isLogin, ()=>{ init() })

    const activityId = import.meta.env.VITE_ACTIVITY_ID
    store.setActivityId(activityId)

    // url token 
    const url = new URL(location.href)
    let params = new URLSearchParams(url.search)
    if (params.get('token')) {
      localStorage.setItem('userToken', params.get('token'))
      store.setLoginStatus()
      params.delete('token')
      init()
      history.pushState({}, null, url.pathname) 
    }
  }
}
</script>

<style lang="scss">
// use-notice ElMessage 客制樣式
.el-message {
  transition: all .3s;
  $message-padding: 13px;
  $message-icon-size: 26px;
  $message-icon-gpg-size: 30px;

  top: 100vh !important;
  // left: 0 !important;
  transform: translate(0, calc(-100% - 20px));
  min-width: 200px !important;
  max-width: 90vw;
  width: fit-content;
  margin: auto;
  &.el-message-fade-enter-from,
  &.el-message-fade-leave-to {
    transform: translate(0, 100%);
  }

  .el-message__icon {
    display: none;
  }

  .new-content {
    display: flex;
    align-items: center;
    width: 100%;
  }

  .new-content__icon {
    display: block;
    box-sizing: border-box;
    width: $message-icon-size;
    min-width: $message-icon-size;
    height: $message-icon-size;
    background-size: cover;

    &.new-content__icon--info,
    &.new-content__icon--error {
      background-image: url('./utils/use-notice/images/i_system_info2.svg');
    }

    &.new-content__icon--success {
      background-image: url('./utils/use-notice/images/i_tick3.svg');
    }

    &.new-content__icon--gpg {
      width: $message-icon-gpg-size;
      min-width: $message-icon-gpg-size;
      height: $message-icon-gpg-size;
      background-image: url('./utils/use-notice/images/logo_gpg_only.svg');
    }
  }

  .new-content__text {
    display: block;
    margin-left: 27px;
    font-size: 18px;
    color: #fff;
    word-break: break-all;
  }

  &.el-message--success,
  &.el-message--info,
  &.el-message--error {
    padding: $message-padding;
    border-radius: 10px;
  }

  &.el-message--success,
  &.el-message--info {
    background-color: #6a13bf;
    border: 0;
    box-shadow: 0 0 12px #0006;
  }

  &.el-message--error {
    background-color: #d61a5a;
    border: 0;
    box-shadow: 0 0 12px #0006;
  }
}
</style>