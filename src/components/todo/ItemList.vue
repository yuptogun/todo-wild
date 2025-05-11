<script setup lang="ts">
import { computed, ModelRef } from 'vue';
import { getRandom } from '../../global/functions';
import Todo from '../../entities/todo';
import Item from './Item.vue';

const emit = defineEmits(['deleteTodo', 'editTodo']);
const props = defineProps(['mode']);
const todoList: ModelRef<Todo[]> = defineModel({ required: true });
// const todoListMode = props.mode

// const inspirations = ['https://femiwiki.com/w/GO_WILD_SPEAK_LOUD_THINK_HARD', 'https://www.bible.com/bible/1/EXO.4.12']
// const suggestions = [`why don't you go wild now?`, `now go wild.`, `now toward your wilderness.`]
const emptyListMessages = computed(() => props.mode === 'open'
  ? [`list what you'd need in the wilderness.`]
  : [`no todo has been archived.`]
);

// const openTodos = computed(() => todoList.value.filter((t: Todo) => t.isOpen()))
const listEmpty = computed(() => todoList.value.length === 0);
// const needsInspiration = computed(() => todoList.value.length !== 0 && listEmpty.value) // 방금 이벤트로 인해서 openTodos가 비어버렸을 경우에만 보여줘야 함. 조금 복잡하니 나중에 구현.
</script>

<template>
  <div>
    <div v-if="listEmpty" class="text-center text-lg m-5 py-5" v-text="getRandom(emptyListMessages)"></div>
    <ul v-else>
      <li v-for="(todo, i) in todoList" :key="todo.id" class="py-2 border-b last:border-none border-gray-200 dark:border-gray-800">
        <Item v-model="todoList[i]"
          @delete-todo="$emit('deleteTodo', todo)"
          @edit-todo="$emit('editTodo', todo)"></Item>
      </li>
    </ul>
  </div>
</template>