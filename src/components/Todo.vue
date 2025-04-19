<script setup lang="ts">
import { computed, inject, onBeforeMount, onMounted, ref } from 'vue'
import { plainToInstance } from 'class-transformer'
import Form from './todo/Form.vue'
import List from './todo/List.vue'
import Todo from '../entities/todo'
import TodoRepo from '../repositories/todoRepo'
import Create from '../dtos/todo/create'

const repo = inject<TodoRepo>('repo', new TodoRepo())
const todos: { value: Todo[] } = ref([])
const todoListMode = ref('open')
const todoList = computed(() => todos.value.filter(
  (t: Todo) => todoListMode.value === 'open' ? t.isOpen() : t.isClosed()
))
const anyDoneTodos = computed(() => !! todos.value.filter(
  (t: Todo) => t.isDone()).length
)

const getTodos = async () => {
  return repo.getAllTodo()
    .then((todosInDB: object[]) => todos.value = plainToInstance(Todo, todosInDB))
}
const addTodo = async (dto: Create) => {
  return await repo.createTodo(dto)
    .then(() => getTodos())
}
const deleteTodo = async (todo: Todo) => {
  return await repo.deleteTodo(todo)
    .then(() => getTodos())
}
const editTodo = async (todo: Todo) => {
  return await repo.updateTodo(todo)
    .then(() => getTodos())
}
const archiveAllSelected = () => {
  todos.value.forEach((t: Todo) => {
    if (t.isDone()) {
      t.archive()
      editTodo(t)
    }
  })
}
const setTodoListMode = (mode: 'open' | 'closed') => {
  todoListMode.value = mode
}

onMounted(async () => await getTodos())
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
      :mode="todoListMode"
      @delete-todo="(todo: Todo) => deleteTodo(todo)"
      @edit-todo="(todo: Todo) => editTodo(todo)"></List>
    <div class="mt-5 sticky bottom-0 bg-gradient-to-t from-white from-90% to-transparent py-3 pt-5">
      <div class="flex gap-3 justify-between">
        <div>
          <button type="button" class="text-sm px-2 py-1 rounded text-slate-700 bg-slate-100 hover:bg-slate-200 focus-visible:outline-offset-2 focus-visible:outline-slate-200"
            v-if="anyDoneTodos"
            @click="archiveAllSelected">archive all selected</button>
        </div>
        <div>
          <button v-if="todoListMode !== 'closed'"
            type="button" class="text-sm px-2 py-1 rounded text-slate-700 bg-slate-100 hover:bg-slate-200"
            @click="setTodoListMode('closed')">show archived</button>
          <button v-else
            type="button" class="text-sm px-2 py-1 rounded text-slate-700 bg-slate-100 hover:bg-slate-200"
            @click="setTodoListMode('open')">show open</button>
        </div>
      </div>
    </div>
  </div>
</template>