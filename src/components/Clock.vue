<script setup lang="ts">
import { ref } from 'vue';

const isOffline = ref(false)
const ampm = ref('')
const hour = ref('')
const minute = ref('')

setInterval(() => {
  isOffline.value = !window.navigator.onLine
  if (isOffline.value) {
    const now = new Date()
    const h = now.getHours()
    const hIn12 = h % 12
    ampm.value = h < 12 ? 'AM' : 'PM'
    hour.value = `${hIn12 === 0 ? 12 : hIn12}`
    minute.value = `${now.getMinutes()}`.padStart(2, '0')
  }
}, 500)
</script>

<template>
  <div>
    <div v-if="isOffline">{{ hour + ':' + minute + ' ' + ampm }}</div>
  </div>
</template>