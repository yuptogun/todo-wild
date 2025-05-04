<script setup lang="ts">
import { Ref, ref } from 'vue';
import TodoControl from './todo/Control.vue';
import ListControl from './todoList/Control.vue';

const listID: Ref<null|string> = ref(window.localStorage.getItem('selectedListID'));
</script>

<template>
  <div class="flex flex-col gap-y-3">
    <ListControl v-model="listID"></ListControl>
    <TodoControl :list-id="listID"></TodoControl>
  </div>
</template>