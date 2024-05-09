<script setup lang="ts">
import { ref } from 'vue';

const todo = ref('')
const addTodo = () => {
  console.log(todo);
}
</script>

<template>
  <form v-on:submit.prevent="addTodo()">
    <div class="flex pb-3 gap-3">
      <input type="text" v-model="todo" class="form-input w-100 rounded flex-grow" placeholder="what needs to be done?" />
      <button type="submit" class="bg-gray-800 text-white rounded px-5 py-3">add</button>
    </div>
  </form>
</template>