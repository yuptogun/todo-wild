<script setup lang="ts">
import { computed, onMounted } from 'vue';
import Form from './todo/Form.vue';
import List from './todo/List.vue';
import { openDB } from 'idb';

const dbVersion = 1;

onMounted(() => {
  async function createStoreInDB () {
    const dbPromise = await openDB('todo-wild', dbVersion, {
      upgrade (db) {
        if (!db.objectStoreNames.contains('todos')) {
          db.createObjectStore('todos', { keyPath: 'id', autoIncrement: true });
        }
      }
    });
  }
  createStoreInDB();
});

const list = computed(async () => {
  const db = await openDB('todo-wild', dbVersion);
  const todos = await db.getAll('todos');
  return todos;
});
</script>

<template>
  <div>
    <Form class="sticky top-0 bg-gradient-to-b from-white from-90% to-transparent py-3"></Form>
    <List :list="list" class="w-full"></List>
  </div>
</template>