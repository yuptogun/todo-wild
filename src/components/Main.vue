<script setup lang="ts">
import { Ref, ref } from 'vue';
import { getLastSelectedListID } from '../global/functions';
import TodoControl from './todo/Control.vue';
import ListControl from './todoList/Control.vue';

const listID: Ref<null|number> = ref(getLastSelectedListID());
</script>

<template>
  <div class="flex flex-col">
    <ListControl v-model="listID"></ListControl>
    <TodoControl :list-id="listID"></TodoControl>
  </div>
</template>