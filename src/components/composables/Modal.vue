<script setup lang="ts">
import { useTemplateRef } from 'vue';
import { onClickOutside } from '@vueuse/core';
import { X } from 'lucide-vue-next';

const emit = defineEmits(['close']);
const dismissTarget = useTemplateRef('dismissTarget');

onClickOutside(dismissTarget, () => emit('close'));
</script>

<template>
  <div class="w-full h-full backdrop-blur-sm fixed top-0 left-0 bg-gray-100/75 dark:bg-gray-800/75" style="z-index: 9999;">
    <div class="text-end">
      <a href="#" class="inline-block p-4 text-gray-950 dark:text-gray-100 hover:opacity-75" @click="emit('close')">
        <X></X>
      </a>
    </div>
    <div class="w-full max-w-xl mx-auto">
      <div class="rounded-sm shadow-lg mx-4 bg-white dark:bg-black" ref="dismissTarget">
        <slot></slot>
      </div>
    </div>
  </div>
</template>