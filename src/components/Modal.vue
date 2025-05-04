<script setup lang="ts">
import { X } from 'lucide-vue-next';
import { ref } from 'vue';

const emit = defineEmits(['close']);
const modalContent = ref();

const tryClosing = (e: Event) => {
  if (modalContent.value && !modalContent.value.contains(e.target)) {
    emit('close');
  }
};
</script>

<template>
  <div class="w-full h-full bg-gray-100/75 backdrop-blur-sm fixed top-0 left-0" @click="tryClosing">
    <div class="text-end">
      <a href="#" class="inline-block p-4 text-gray-950 hover:opacity-75" @click="emit('close')">
        <X></X>
      </a>
    </div>
    <div class="w-full max-w-xl mx-auto">
      <div class="bg-white rounded-sm shadow-lg mx-4" ref="modalContent">
        <slot></slot>
      </div>
    </div>
  </div>
</template>