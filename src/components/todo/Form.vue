<script setup lang="ts">
import { computed, ref } from 'vue'

const emit = defineEmits(['addTodo'])

const todoInput = ref('')
const cannotAddTodo = computed(() => !todoInput.value.length)

const submitTodo = () => {
  emit('addTodo', todoInput.value)
  todoInput.value = ''
}
</script>

<template>
  <form v-on:submit.prevent="submitTodo()">
    <div class="flex pb-3 gap-3">
      <div class="grow">
        <input type="text" id="newTodoInput" v-model.trim="todoInput" class="w-100 form-input rounded w-full" placeholder="what needs to be done?" required />
      </div>
      <div class="shrink">
        <button type="submit" class="rounded px-4 py-2 bg-gray-800 text-white disabled:bg-gray-200 disabled:text-gray-400 focus-visible:outline-offset-2 focus-visible:outline-gray-800" :disabled="cannotAddTodo">add</button>
      </div>
    </div>
  </form>
</template>