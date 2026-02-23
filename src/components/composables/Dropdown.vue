<script setup lang="ts">
import { ref, useTemplateRef } from 'vue';
import { onClickOutside } from '@vueuse/core';
import { ChevronDown, ChevronUp } from 'lucide-vue-next';

const { buttonClassnames, alignX, showChevron } = defineProps({
  buttonClassnames: {
    type: String,
    required: false,
    default: ''
  },
  alignX: {
    type: String,
    required: false,
    default: 'left',
    validator: (value: string) => ['left', 'right'].includes(value)
  },
  showChevron: {
    type: Boolean,
    required: false,
    default: true
  }
});
const isDropdownOpen = ref(false);
const dismissTarget = useTemplateRef('dismissTarget');

const toggleDropdown = () => {
  isDropdownOpen.value = !isDropdownOpen.value;
};
const closeDropdown = () => {
  isDropdownOpen.value = false;
};

onClickOutside(dismissTarget, closeDropdown);
defineExpose({
  closeDropdown
});
</script>

<template>
  <div class="relative" ref="dismissTarget">
    <button :class="buttonClassnames" @click="toggleDropdown">
      <slot name="button"></slot>
      <template v-if="showChevron && $slots.dropdown">
         <ChevronUp :size="16" v-if="isDropdownOpen"></ChevronUp>
         <ChevronDown :size="16" v-else></ChevronDown>
      </template>
    </button>
    <Transition
      enter-from-class="opacity-0 -translate-y-2"
      enter-active-class="transition-all"
      leave-active-class="transition-all"
      leave-to-class="opacity-0 -translate-y-2">
      <ul v-if="$slots.dropdown && isDropdownOpen"
        :class="`absolute top-full mt-1 border rounded shadow-md z-10 bg-white dark:bg-gray-950 dark:border-gray-700 ${alignX === 'left' ? 'left-0' : 'right-0'}`">
        <slot name="dropdown"></slot>
      </ul>
    </Transition>
  </div>
</template>