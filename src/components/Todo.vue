<script setup lang="ts">
import { computed, ref } from 'vue'
import Form from './todo/Form.vue'
import List from './todo/List.vue'
import Todo from '../entities/todo'

const todos = ref([])
const todoList = ref(todos)

const anyDoneTodos = computed(() => !! todos.value.filter((t: Todo) => t.isDone()).length)

const archiveAllSelected = () => {
  todos.value.forEach((t: Todo) => {
    if (t.isDone()) {
      t.archive()
    }
  })
}
// const showArchived = () => {
//   todoList.value = todos.value.filter((t: Todo) => t.isClosed())
// }

// onBeforeMount(async () => {
//   const dbVersion = 1
//   const db = await openDB('todo-wild', dbVersion)
//   todoList.value = (await db.getAll('todos')).map((t) => plainToInstance(Todo, t))
// })
</script>

<template>
  <div>
    <div class="sticky top-0 bg-gradient-to-b from-white from-90% to-transparent py-3">
      <Form v-model="todos"></Form>
    </div>
    <List v-model="todoList" class="w-full"></List>
    <div class="mt-5 sticky bottom-0 bg-gradient-to-t from-white from-90% to-transparent py-3 pt-5"
      v-if="anyDoneTodos"><!-- to be moved into buttons -->
      <div class="flex gap-3 justify-between">
        <div>
          <button type="button" class="text-sm px-2 py-1 rounded text-slate-700 bg-slate-100 hover:bg-slate-200"
            @click="archiveAllSelected">archive all selected</button>
        </div>
        <!-- <div>
          <button type="button" class="text-sm px-2 py-1 rounded text-slate-700 bg-slate-100 hover:bg-slate-200"
            @click="showArchived">show archived</button>
        </div> -->
      </div>
    </div>
  </div>
</template>