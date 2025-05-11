<script setup lang="ts">
import { computed, inject, onMounted, ref, watchEffect } from 'vue';
import { plainToInstance } from 'class-transformer';
import Create from '../../dtos/todo/create';
import Todo from '../../entities/todo';
import List from '../../entities/list';
import TodoRepo from '../../repositories/todoRepo';
import Form from './Form.vue';
import ItemList from '../todo/ItemList.vue';
import { colorsToggleButton } from '../../global/functions';

const repo = inject<TodoRepo>('repo', new TodoRepo());
const { listId } = defineProps<{
  listId: null|number;
}>();

const list = ref<List|null>(null);
const todos: { value: Todo[] } = ref([]);
const todoItemListMode = ref('open');
const todoItems = computed(() => todos.value.filter(
  (t: Todo) => todoItemListMode.value === 'open' ? t.isOpen() : t.isClosed()
));
const anyDoneTodos = computed(
  () => !! todos.value.filter((t: Todo) => t.isDone()).length
);
const archivedTodoCount = computed(() => todos.value.filter(t => t.isArchived()).length);
const openTodoCount = computed(() => todos.value.length - archivedTodoCount.value);
const buttonClassnames = `${colorsToggleButton} text-sm px-2 py-1 rounded-sm`;

const getList = () => {
  if (listId) {
    repo.getList(listId).then((l) => {
      list.value = l;
    });
  } else {
    list.value = null;
  }
};
const getTodos = () => {
  repo.getAllTodo(listId)
    .then((todosInDB: object[]) => todos.value = plainToInstance(Todo, todosInDB))
}
const addTodo = (todoText: string) => {
  const dto = new Create(todoText, listId || undefined);
  repo.createTodo(dto).then(getTodos);
};
const deleteTodo = (todo: Todo) => {
  repo.deleteTodo(todo).then(getTodos);
};
const editTodo = (todo: Todo) => {
  repo.updateTodo(todo).then(getTodos);
};
const archiveAllSelected = () => {
  todos.value.forEach((t: Todo) => {
    if (t.isDone()) {
      t.archive();
      editTodo(t);
    }
  });
}
const setTodoListMode = (mode: 'open' | 'closed') => {
  todoItemListMode.value = mode;
};
const onLoad = () => {
  getList();
  getTodos();
  setTodoListMode('open');
};

onMounted(onLoad);
watchEffect(onLoad);
</script>

<template>
  <div>
    <div class="flex flex-col">
      <div class="sticky top-0 bg-linear-to-b from-90% to-transparent from-white dark:from-gray-950">
        <div class="pt-4 px-4 pb-6">
          <Form @add-todo="(todo: string) => addTodo(todo)"></Form>
        </div>
      </div>
      <ItemList class="w-full px-4"
        v-model="todoItems"
        :mode="todoItemListMode"
        @delete-todo="(todo: Todo) => deleteTodo(todo)"
        @edit-todo="(todo: Todo) => editTodo(todo)"></ItemList>
      <div class="sticky bottom-0 mt-5 pt-5 px-4 pb-3 bg-linear-to-t from-90% to-transparent from-white dark:from-gray-950">
        <div class="flex gap-3 justify-between">
          <div>
            <button v-if="anyDoneTodos" @click="archiveAllSelected" type="button"
              :class="buttonClassnames">
              archive selected
            </button>
          </div>
          <div>
            <button v-if="todoItemListMode !== 'closed'" @click="setTodoListMode('closed')" type="button" :class="buttonClassnames">
              see {{ archivedTodoCount.toLocaleString() }} archived
            </button>
            <button v-else @click="setTodoListMode('open')" type="button" :class="buttonClassnames">
              see {{ openTodoCount.toLocaleString() }} open
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>