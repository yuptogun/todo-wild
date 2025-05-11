<script setup lang="ts">
import { computed, ref } from 'vue';
import { Plus } from 'lucide-vue-next';

const emit = defineEmits(['addTodo']);

const todoInput = ref('');
const cannotAddTodo = computed(() => !todoInput.value.trim().length);

const setTodoInputValue = (e: Event) => {
  todoInput.value = (e.target as HTMLInputElement).value;
};
const submitTodo = () => {
  emit('addTodo', todoInput.value.trim());
  todoInput.value = '';
};
</script>

<template>
  <form v-on:submit.prevent="submitTodo">
    <div class="flex gap-3 items-center">
      <div class="grow">
        <input v-model="todoInput" @input="setTodoInputValue"
          type="text" class="form-input rounded-sm w-full bg-transparent" placeholder="what needs to be done?" required />
      </div>
      <div>
        <button type="submit" class="self-stretch rounded-sm px-3 py-2 bg-gray-800 text-white disabled:bg-gray-200 disabled:text-gray-400 focus-visible:outline-offset-2 focus-visible:outline-gray-800" :disabled="cannotAddTodo">
          <Plus :size="20"></Plus>
        </button>
      </div>
    </div>
  </form>
</template>