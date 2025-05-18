<script setup lang="ts">
import { computed, inject, ref, Transition } from 'vue';
import LocalStorage from '../../repositories/localStorage';

const configStorage = inject<LocalStorage>('local-storage', new LocalStorage);

const hour = ref('');
const minute = ref('');
const ampm = ref('');

const show = computed(() => {
  const isOnline = window.navigator.onLine;
  return isOnline
    ? (configStorage.getItem('show_clock.online') || false)
    : (configStorage.getItem('show_clock.offline') || true);
});

setInterval(() => {
  if (show) {
    const now = new Date();
    const h = now.getHours();
    const hIn12 = h % 12;
    ampm.value = h < 12 ? 'AM' : 'PM';
    hour.value = `${hIn12 === 0 ? 12 : hIn12}`;
    minute.value = `${now.getMinutes()}`.padStart(2, '0');
  }
}, 500);
</script>

<template>
  <div>
    <Transition
      enter-active-class="transition-all"
      leave-active-class="transition-all"
      enter-from-class="opacity-0"
      leave-to-class="opacity-0">
      <div v-if="show && ampm">{{ hour + ':' + minute + ' ' + ampm }}</div>
    </Transition>
  </div>
</template>