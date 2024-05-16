<script setup lang="ts">
import { computed, ref } from 'vue'
import Todo from '../../entities/todo'
import Item from './Item.vue';

const inspirations = ['https://femiwiki.com/w/GO_WILD_SPEAK_LOUD_THINK_HARD', 'https://www.bible.com/ko/bible/1/EXO.4.12']
const suggestions = [`why don't you go wild now?`, `now go wild.`, `now toward your wilderness.`]
const getRandom = function (items: string[]) {
  return items[Math.floor(Math.random() * items.length)]
}

const todoList = defineModel()

const openTodos = computed(() => todoList.value.filter((t: Todo) => t.isOpen()))
const allDone = computed(() => openTodos.value.length === 0)
const needsInspiration = computed(() => todoList.value.length !== 0 && allDone.value)

const deleteTodo = (id: number) => {
  todoList.value = todoList.value.filter((t: Todo) => t.id !== id)
}
</script>

<template>
  <div>
    <div v-if="allDone" class="text-center text-lg m-5 py-5">
      <span v-if="needsInspiration">
        guess you're ready. <a :href="getRandom(inspirations)" target="_blank" class="text-gray-700 hover:text-gray-600">{{ getRandom(suggestions) }}</a>
      </span>
      <span v-else class="py-5">make a checklist here.</span>
    </div>
    <ul v-else>
      <li v-for="(todo, i) in openTodos" :key="todo.id" class="border-b border-gray-200 py-3 last:border-none">
        <Item v-model="openTodos[i]" @delete-todo="(id: number) => deleteTodo(id)"></Item>
      </li>
    </ul>
  </div>
</template>