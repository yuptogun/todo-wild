<script setup lang="ts">
import { plainToInstance } from 'class-transformer'
import { computed, ref } from 'vue'
import Todo from '../../entities/todo'
import { TodoStatus } from '../../enums/TodoStatus'

const todoList = defineModel()

const todoInput = ref('')
const cannotAddTodo = computed(() => !todoInput.value.length)
const getNewTodoID = () => {
  let ids = todoList.value?.flatMap((t: Todo) => t.id)
  if (ids.length === 0) {
    ids = [0]
  }
  return Math.max(...ids) + 1
}

const addTodo = () => {
  // 여기쯤에 indexed db 삽입 루틴 추가 필요
  const newTodoItem = plainToInstance(Todo, {
    id: getNewTodoID(),
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
      <div class="grow">
        <input type="text" v-model.trim="todoInput" class="w-100 form-input rounded w-full" placeholder="what needs to be done?" required />
      </div>
      <div class="shrink">
        <button type="submit" class="rounded px-4 py-2 bg-gray-800 text-white disabled:bg-gray-200 disabled:text-gray-400" :disabled="cannotAddTodo">add</button>
      </div>
    </div>
  </form>
</template>