import { createRouter, createWebHistory } from 'vue-router'
const activityId = import.meta.env.VITE_ACTIVITY_ID

const getView = (activityId) => {
  if (activityId === '2022Kaohsiunggogo') return import('@/views/Kaohsiunggogo.vue')
  if (activityId === '2022Philippines') return import('@/views/Philippines.vue')
  return null
}

let history = createWebHistory(import.meta.env.BASE_URL)
let routes = [
  {
    path: '/',
    name: import.meta.env.VITE_APP_TITLE,
    component: () => import('@/views/Kaohsiunggogo.vue'),
  }
]


export default createRouter({ history, routes })