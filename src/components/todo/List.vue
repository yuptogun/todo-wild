<script setup lang="ts">
import { computed } from 'vue'
import Todo from '../../entities/todo'

const inspirations = ['https://femiwiki.com/w/GO_WILD_SPEAK_LOUD_THINK_HARD', 'https://www.bible.com/ko/bible/1/EXO.4.12']
const suggestions = [`why don't you go wild now?`, `now go wild.`, `now toward your wilderness.`]
const getRandom = function (items: string[]) {
  return items[Math.floor(Math.random() * items.length)]
}
const markTodo = (todo: Todo, event) => {
  event.target.checked
    ? todo.markDone()
    : todo.markUndone()
}

const todoList = defineModel()

const openTodos = computed(() => todoList.value.filter((t: Todo) => t.isOpen()))
const allDone = computed(() => openTodos.value.length === 0)
const needsInspiration = computed(() => todoList.value.length !== 0 && allDone.value)
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
      <li v-for="todo in openTodos" :key="todo.id" class="border-b border-gray-200 py-3 last:border-none">
        <div class="flex">
          <label class="grow cursor-pointer" :class="{ 'line-through text-slate-400': todo.isDone() }">
            <input type="checkbox" class="form-checkbox rounded mx-3" :checked="todo.isDone()" @change="markTodo(todo, $event)" />{{ todo.todo }}
          </label>
          <div class="shrink">
            <div class="flex items-center gap-2">
              <button v-if="todo.isDone()" type="button"
                class="rounded px-2 py-1 text-white text-sm bg-slate-500 hover:bg-slate-400" @click="todo.archive()">archive</button>
              <button v-else type="button"
                class="rounded px-2 py-1 text-white text-sm bg-gray-500 hover:bg-gray-400">edit</button>
            </div>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>