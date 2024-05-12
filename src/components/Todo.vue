<script setup lang="ts">
import { ref } from 'vue'
import Form from './todo/Form.vue'
import List from './todo/List.vue'

const todoList = ref([])

// onBeforeMount(async () => {
//   const dbVersion = 1
//   const db = await openDB('todo-wild', dbVersion)
//   todoList.value = (await db.getAll('todos')).map((t) => plainToInstance(Todo, t))
// })
</script>

<template>
  <div>
    <Form v-model="todoList" class="sticky top-0 bg-gradient-to-b from-white from-90% to-transparent py-3"></Form>
    <List v-model="todoList" class="w-full"></List>
  </div>
</template>