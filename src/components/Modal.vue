<script setup lang="ts">
import { ref } from 'vue';
import { X } from 'lucide-vue-next';
import { onClickedOutside } from '../global/functions';

const emit = defineEmits(['close']);
const modalContent = ref();

const closeOnClickedOutside = (e: Event) => onClickedOutside(e, modalContent, () => emit('close'));
</script>

<template>
  <div class="w-full h-full backdrop-blur-sm fixed top-0 left-0 bg-gray-100/75 dark:bg-gray-800/75" @click="closeOnClickedOutside">
    <div class="text-end">
      <a href="#" class="inline-block p-4 text-gray-950 dark:text-gray-100 hover:opacity-75" @click="emit('close')">
        <X></X>
      </a>
    </div>
    <div class="w-full max-w-xl mx-auto">
      <div class="rounded-sm shadow-lg mx-4 bg-white dark:bg-black" ref="modalContent">
        <slot></slot>
      </div>
    </div>
  </div>
</template>