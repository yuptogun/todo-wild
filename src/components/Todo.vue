<script setup lang="ts">
import { computed, inject, onBeforeMount, ref } from 'vue'
import { plainToInstance } from 'class-transformer';
import Form from './todo/Form.vue'
import List from './todo/List.vue'
import Todo from '../entities/todo'
import TodoRepo from '../repositories/todoRepo';
import Create from '../dtos/todo/create';

const todos: { value: Todo[] } = ref([])
const todoList = ref(todos)
const repo = inject<TodoRepo>('repo', new TodoRepo())

const anyDoneTodos = computed(() => !! todos.value.filter((t: Todo) => t.isDone()).length)

const getTodos = async () => {
  return repo.getAll()
    .then((todosInDB: object[]) => todos.value = plainToInstance(Todo, todosInDB))
}
const addTodo = async (dto: Create) => {
  return await repo.create(dto)
    .then(() => getTodos())
}
const deleteTodo = async (todo: Todo) => {
  return await repo.delete(todo)
    .then(() => getTodos())
}
const archiveAllSelected = () => {
  todos.value.forEach((t: Todo) => {
    if (t.isDone()) {
      t.archive()
    }
  })
}

onBeforeMount(async () => await getTodos())
</script>

<template>
  <div>
    <div class="sticky top-0 bg-gradient-to-b from-white from-90% to-transparent py-3">
      <Form v-model="todos"
        @add-todo="(todo: string) => addTodo(new Create(todo))">
      </Form>
    </div>
    <List class="w-full"
      v-model="todoList"
      @delete-todo="(todo: Todo) => deleteTodo(todo)"></List>
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