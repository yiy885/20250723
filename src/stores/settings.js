import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useSettingsStore = defineStore('settings', () => {
  const alarms = [
    { id: 1, name: '鬧鐘', file: new URL('@/assets/alarm.mp3', import.meta.url).href },
    { id: 2, name: 'yay', file: new URL('@/assets/yay.mp3', import.meta.url).href },
  ]

  const selected = ref(1)

  return {
    alarms,
    selected,
  }
})
