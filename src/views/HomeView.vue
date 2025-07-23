<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <h1>目前事項</h1>
        <h2>{{ list.currentItem }}</h2>
        <h2>{{ list.timeleft }}</h2>
        <h2>{{ timeLeftText }}</h2>
        <DigitNumber v-for="(data, i) in timeLeftText" :key="i" color="white" :data="data" />
      </v-col>
      <v-col cols="12">
        <!--
          開始按鈕停用條件:
          1. 倒數中
          2. 目前沒有事項或沒有未完成事項
        -->
        <v-btn
          :disabled="
            status === STATUS.COUNTING || (list.currentItem.length === 0 && list.items.length === 0)
          "
          icon="mdi-play"
          @click="startTimer"
        />
        <!-- 只有倒數中才能按暫停 -->
        <v-btn :disabled="status !== STATUS.COUNTING" icon="mdi-pause" />
        <!-- 目前有事項才能跳過 -->
        <v-btn :disabled="list.currentItem.length === 0" icon="mdi-skip-next" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { computed, ref } from 'vue'
import DigitNumber from '@/components/DigitNumber.vue'
import { useListStore } from '@/stores/list'

const list = useListStore()

// 倒數狀態
const STATUS = {
  STOP: 0,
  COUNTING: 1,
  PAUSE: 2,
}
const status = ref(STATUS.STOP)

// 計時器
let timer = 0
// 開始計時器
// 暫停繼續 + 停止開始
const startTimer = () => {
  // 如果是停止開始，更新目前事項
  if (status.value === STATUS.STOP && list.items.length > 0) {
    list.setCurrentItem()
  }

  // 狀態變成倒數中
  status.value = STATUS.COUNTING

  // 開始倒數
  timer = setInterval(() => {
    list.countdown()

    if (list.timeleft <= 0) {
      clearInterval(timer)
    }
  }, 1000)
}

const timeLeftText = computed(() => {
  const m = Math.floor(list.timeleft / 60)
    .toString()
    .padStart(2, '0')
  const s = (list.timeleft % 60).toString().padStart(2, '0')
  return m + ':' + s
})
</script>
