<script setup lang="ts">
import { ref } from 'vue'
import Todo from '../../entities/todo'

const emit = defineEmits(['deleteTodo', 'editTodo'])
const todo = defineModel({ required: true })
const mode = ref('show')

const isEditing = () => mode.value === 'edit'
const startEditing = () => mode.value = 'edit'
const stopEditing = () => mode.value = 'show'

const edit = () => {
  emit('editTodo', todo)
  stopEditing()
}

const markTodo = (todo: Todo, event) => {
  event.target.checked ? todo.markDone() : todo.markUndone()
  emit('editTodo', todo)
}
const archiveTodo = (todo: Todo) => {
  todo.archive()
  emit('editTodo', todo)
}
</script>

<template>
  <div v-if="isEditing()">
    <form class="flex items-center" @submit.prevent="edit()">
      <div class="grow">
        <div class="w-full pe-3">
          <input type="text" class="w-full form-input rounded" :id="`editTodoInput${todo.id}`" required
            :placeholder="todo.todo"
            v-model="todo.todo" />
        </div>
      </div>
      <div class="shrink">
        <div class="flex items-center gap-2">
          <button type="submit"
            :disabled="todo.todo.trim() === ''"
            class="rounded px-2 py-1 text-sm text-white bg-gray-600 hover:bg-gray-700 disabled:bg-gray-200 disabled:text-gray-400 focus-visible:outline-offset-2 focus-visible:outline-gray-700">save</button>
        </div>
      </div>
    </form>
  </div>
  <div v-else>
    <div class="flex">
      <label class="grow cursor-pointer" :class="{ 'line-through text-slate-400': todo.isDone() }">
        <div class="flex items-start gap-3 h-full">
          <input type="checkbox" class="form-checkbox rounded mt-1" :checked="todo.isDone()" :id="`checkTodo${todo.id}`"
            @change="markTodo(todo, $event)" />
          <div class="break-all me-3">{{ todo.todo }}</div>
        </div>
      </label>
      <div class="shrink">
        <div class="flex items-center gap-2">
          <div v-if="todo.isDone()">
            <button type="button"
              class="rounded px-2 py-1 text-white text-sm bg-slate-500 hover:bg-slate-400 focus-visible:outline-offset-2 focus-visible:outline-slate-400"
              @click="archiveTodo(todo)">archive</button>
          </div>
          <div v-else class="flex gap-2">
            <button type="button" @click="$emit('deleteTodo', todo.id)"
              class="rounded px-2 py-1 text-white text-sm bg-red-500 hover:bg-red-400 focus-visible:outline-offset-2 focus-visible:outline-red-400">delete</button>
            <button type="button" @click="startEditing()"
              class="rounded px-2 py-1 text-white text-sm bg-gray-500 hover:bg-gray-400 focus-visible:outline-offset-2 focus-visible:outline-gray-400">edit</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>