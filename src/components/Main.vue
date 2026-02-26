<script setup lang="ts">
import { inject, ref, Ref } from 'vue';
import TodoControl from './todo/Control.vue';
import ListControl from './todoList/Control.vue';

const storage = inject('localStorage') as Ref<{ selected_list_id: number }>;
const listID: Ref<number> = ref(storage.value.selected_list_id || 0);
</script>

<template>
  <div class="flex flex-col">
    <ListControl v-model="listID"></ListControl>
    <TodoControl :listID="listID"></TodoControl>
  </div>
</template>