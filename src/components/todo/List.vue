<script setup lang="ts">
import { ref, computed, defineProps } from 'vue';

const props = defineProps(['list']);
// const list = props.list || [];
const list = [{id: 3, todo: 'test 3', status: 'closed'}, {id: 2, todo: 'test 2', status: 'done'}, {id: 1, todo: 'test 1', status: 'open'}];
const todos = ref(list.filter((t) => t.status !== 'closed'));
const allDone = computed(() => todos.value.filter((todo) => todo.status === 'open').length === 0);
const shouldGoWild = computed(() => list.length !== 0 && todos.value.length === 0);
</script>

<template>
  <div>
    <ul v-if="todos.length">
      <li v-for="todo in todos" :key="todo.id" class="border-b border-gray-200 py-3 last:border-none">
        <label class="block w-full">
          <input type="checkbox" class="form-checkbox rounded me-2" :checked="todo.status === 'done'" />
          {{ todo.todo }}
        </label>
      </li>
    </ul>
    <p v-if="allDone" class="text-center text-lg m-5">
      you've got nothing else to do<span v-if="shouldGoWild">; <a href="https://www.bible.com/ko/bible/1/EXO.4.12" target="_blank" class="text-gray-700 hover:text-gray-600">now go wild</a></span>.
    </p>
  </div>
</template>