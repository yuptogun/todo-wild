<script setup lang="ts">
import { computed, onMounted, ref, Transition } from 'vue';

const props = defineProps<{
  showOffline: boolean;
  showOnline: boolean;
}>();
const show = computed(() => window.navigator.onLine ? props.showOnline : props.showOffline);
const time = ref('');

const setTime = () => {
  const now = new Date();
  const h = now.getHours();
  const hIn12 = h % 12;
  const hour = hIn12 === 0 ? 12 : hIn12;
  const minute = now.getMinutes().toString().padStart(2, '0');
  const ampm = h < 12 ? 'AM' : 'PM';
  time.value = `${hour}:${minute} ${ampm}`;
};
const render = () => {
  if (show) {
    setTime();
  }
};

onMounted(() => {
  render();
});
setInterval(render, 500);
</script>

<template>
  <div>
    <Transition
      enter-active-class="transition-all"
      leave-active-class="transition-all"
      enter-from-class="opacity-0"
      leave-to-class="opacity-0">
      <div v-if="show">{{ time }}</div>
    </Transition>
  </div>
</template>