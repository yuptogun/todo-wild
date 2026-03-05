<script setup>
import { Transition } from 'vue';

const init = (el) => {
  el.style.overflow = 'hidden';
  el.style.height = '0 !important';
}
const slideDown = (el) => el.style.height = el.scrollHeight + 'px';
const slideUp = (el) => el.style.height = '';
</script>

<template>
  <div>
    <Transition name="slide-toggle"
      @before-enter="init"
      @enter="slideDown"
      @after-enter="slideUp"
      @before-leave="slideDown"
      @after-leave="slideUp">
      <slot></slot>
    </Transition>
  </div>
</template>

<style>
.slide-toggle-enter-active,
.slide-toggle-leave-active {
  transition: height 0.25s ease;
  -webkit-transition: height 0.25s ease;
}
.slide-toggle-enter-from,
.slide-toggle-leave-to {
  overflow: hidden;
  height: 0 !important;
}
</style>