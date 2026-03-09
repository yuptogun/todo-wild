<script setup lang="ts">
import { useTemplateRef } from 'vue';
import { onClickOutside } from '@vueuse/core';
import { X } from 'lucide-vue-next';

const { show } = defineProps({
  show: {
    type: Boolean,
    required: true,
    default: false,
  }
});
const emit = defineEmits(['close']);
const dismissTarget = useTemplateRef('dismissTarget');

onClickOutside(dismissTarget, () => emit('close'));
</script>

<template>
  <Teleport to="body">
    <Transition
      enter-active-class="transition-all"
      leave-active-class="transition-all"
      enter-from-class="opacity-0 translate-y-2"
      leave-to-class="opacity-0 translate-y-2">
      <div v-if="show" style="z-index: 9999;"
        class="w-full h-full backdrop-blur-sm fixed top-0 left-0 bg-gray-100/75 dark:bg-gray-800/75">
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
    </Transition>
  </Teleport>
</template>