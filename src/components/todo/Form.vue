<script setup lang="ts">
import { plainToInstance } from 'class-transformer'
import { computed, ref } from 'vue'
import Todo from '../../entities/todo'
import { TodoStatus } from '../../enums/TodoStatus';

const todoList = defineModel({ type: Array })

const todoInput = ref('')
const cannotAddTodo = computed(() => !todoInput.value.length)

const addTodo = () => {
  // 여기쯤에 indexed db 삽입 루틴 추가 필요
  const newTodoItem = plainToInstance(Todo, {
    todo: todoInput.value,
    status: TodoStatus.Undone,
  })
  todoList.value?.unshift(newTodoItem)
  todoInput.value = ''
}
</script>

<template>
  <form v-on:submit.prevent="addTodo">
    <div class="flex pb-3 gap-3">
      <input type="text" v-model.trim="todoInput" class="form-input w-100 rounded flex-grow" placeholder="what needs to be done?" required />
      <button type="submit" class="bg-gray-800 text-white rounded px-5 py-3 disabled:bg-gray-200 disabled:text-gray-400" :disabled="cannotAddTodo">add</button>
    </div>
  </form>
</template>