import { defineStore } from 'pinia'
import { reactive, ref } from 'vue'

const time = Number.parseInt(import.meta.env.VITE_TIME)
const timeBreak = Number.parseInt(import.meta.env.VITE_TIME_BREAK)

export const useListStore = defineStore('list', () => {
  // 未完成事項
  const items = reactive([])
  // 已完成事項
  const finishedItems = reactive([])
  // 目前進行事項
  const currentItem = ref('')
  // id
  let id = 1

  // 倒數剩餘時間
  const timeleft = ref(time)

  const addItem = value => {
    items.push({
      id: id++,
      text: value,
      edit: false,
      model: value,
    })
  }

  const editItem = id => {
    const i = items.findIndex(item => item.id === id)
    items[i].edit = true
  }

  const submitEdit = id => {
    const i = items.findIndex(item => item.id === id)
    items[i].text = items[i].model
    items[i].edit = false
  }

  const cancelEdit = id => {
    const i = items.findIndex(item => item.id === id)
    items[i].model = items[i].text
    items[i].edit = false
  }

  const delItem = id => {
    const i = items.findIndex(item => item.id === id)
    items.splice(i, 1)
  }

  const setCurrentItem = () => {
    currentItem.value = items.shift().text
  }

  const countdown = () => {
    timeleft.value--
  }

  return {
    items,
    finishedItems,
    currentItem,
    timeleft,
    addItem,
    editItem,
    submitEdit,
    cancelEdit,
    delItem,
    setCurrentItem,
    countdown,
  }
})
