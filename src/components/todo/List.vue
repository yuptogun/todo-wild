<script setup lang="ts">
import { ref, computed, defineProps } from 'vue'
import Todo from '../../entities/todo'
import { TodoStatus } from '../../enums/TodoStatus'
import { plainToInstance } from 'class-transformer'

const inspirations = ['https://femiwiki.com/w/GO_WILD_SPEAK_LOUD_THINK_HARD', 'https://www.bible.com/ko/bible/1/EXO.4.12']
const suggestions = [`why don't you go wild now?`, `now go wild.`, `now toward your wilderness.`]
const getRandom = function (items: string[]) {
  return items[Math.floor(Math.random() * items.length)]
}

const todoList: { value: Todo[]; } = defineModel()
// console.log(todoList.value)

const openTodos = computed(() => todoList.value.filter((t: Todo) => t.isOpen()))
const allDone = computed(() => openTodos.value.length === 0)
const needsInspiration = computed(() => todoList.value.length !== 0 && allDone.value)
</script>

<template>
  <div>
    <p v-if="allDone" class="text-center text-lg m-5">
      <span v-if="needsInspiration">
        you've got nothing else to do <a :href="getRandom(inspirations)" target="_blank" class="text-gray-700 hover:text-gray-600">{{ getRandom(suggestions) }}</a>
      </span>
      <span v-else>you've got nothing else to do.</span>
    </p>
    <ul v-else>
      <li v-for="todo in openTodos" :key="todo.id" class="border-b border-gray-200 py-3 last:border-none">
        <label class="block w-full">
          <input type="checkbox" class="form-checkbox rounded me-2" :checked="todo.status === 'done'" />
          {{ todo.todo }}
        </label>
      </li>
    </ul>
  </div>
</template>