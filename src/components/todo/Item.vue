<script setup lang="ts">
import { ref } from 'vue'
import Todo from '../../entities/todo'

const todo = defineModel({ required: true })
const mode = ref('show')

const isEditing = () => mode.value === 'edit';
const startEditing = () => mode.value = 'edit';
const stopEditing = () => mode.value = 'show';

const markTodo = (todo: Todo, event) => {
  event.target.checked
    ? todo.markDone()
    : todo.markUndone()
}
</script>

<template>
  <div v-if="isEditing()">
    <form class="flex items-center" @submit.prevent="stopEditing()">
      <div class="grow">
        <div class="w-full pe-3">
          <input type="text" class="w-full form-input rounded" required
            :placeholder="todo.todo"
            v-model="todo.todo" />
        </div>
      </div>
      <div class="shrink">
        <div class="flex items-center gap-2">
          <button type="submit"
            :disabled="todo.todo.trim() === ''"
            class="rounded px-2 py-1 text-sm text-white bg-gray-600 hover:bg-gray-700 disabled:bg-gray-200 disabled:text-gray-400">save</button>
        </div>
      </div>
    </form>
  </div>
  <div v-else>
    <div class="flex">
      <label class="grow cursor-pointer" :class="{ 'line-through text-slate-400': todo.isDone() }">
        <input type="checkbox" class="form-checkbox rounded mx-3" :checked="todo.isDone()"
          @change="markTodo(todo, $event)" />{{ todo.todo }}
      </label>
      <div class="shrink">
        <div class="flex items-center gap-2">
          <button v-if="todo.isDone()" type="button"
            class="rounded px-2 py-1 text-white text-sm bg-slate-500 hover:bg-slate-400"
            @click="todo.archive()">archive</button>
          <button v-else type="button" @click="startEditing()"
            class="rounded px-2 py-1 text-white text-sm bg-gray-500 hover:bg-gray-400">edit</button>
        </div>
      </div>
    </div>
  </div>
</template>