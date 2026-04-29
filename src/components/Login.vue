<script>
  export default {
    name: 'vue-login',
  }
</script>

<script setup>
import { postTokenLogin } from '@/api/index.js'
import { computed, reactive, ref } from 'vue'
import { useStore } from '@/stores/index.js'
import { ERROR_MESSAGE } from '@/configs/config.js'
import { useNotice } from '@/utils/use-notice/index.js'

const store = useStore()
const loading = ref(false)
const isLogin = computed(() => store.isLogin)

const user = reactive({
  account: { type: 'text', value: '', placeholder: 'account' },
  password: { type: 'password', value: '', placeholder: 'password' },
})
const isSubmit = computed(() => {
  let isLegal = true
  if (!user.account.value.replace(" ", "") || !user.password.value.replace(" ", "")) isLegal = false
  if (user.password.value.length < 6 || user.password.value.length >12) isLegal = false
  return isLegal
})

const submit = async () => {
  localStorage.removeItem('userToken')
  if (!isSubmit.value) return false
  if (loading.value) return false

  try {
    loading.value = true
    const response = await postTokenLogin({
      account: user.account.value,
      password: user.password.value,
    })
    localStorage.setItem('userToken', JSON.stringify(response))
    store.setLoginStatus()
  } catch (err) {
    useNotice({ type: 'error', message: ERROR_MESSAGE(store.activityId,'login',err.Code) })
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div id="loginView" class="fixed top-0 left-0 w-full h-full" v-if="!isLogin">
    <div class="inset-0 z-1 bg-[black] fixed opacity-85"></div>
    <div class="h-screen w-screen flex justify-center items-center z-2">
      <div class="bg-[#323037] p-10 w-full max-w-[400px] text-white rounded-2xl">
        <div class="text-center text-[20px] font-bold">LOGIN ACCOUNT</div>
        <input
          v-for="(item, index) of user"
          :key="index"
          :placeholder="item.placeholder"
          class="w-full py-3 px-5 mt-5 rounded-4xl text-black"
          :type="item.type"
          v-model="item.value"
          :maxlength="item.type === 'account' ? 20 : 12 "
        />
        <button 
          class=" w-full p-3 mt-5 rounded-4xl" 
          :class="isSubmit ? 'bg-[#6a13bf] cursor-pointer':'bg-[#5e5765] cursor-not-allowed'"
          @click="submit" 
          :disabled="!isSubmit"
        >Login</button> 
      </div>
    </div>
  </div>
</template>
