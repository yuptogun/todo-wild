<script setup lang="ts">
import { computed, ref } from 'vue';
import { Plus } from 'lucide-vue-next';
import { colorsSubmitButton } from '../../global/functions';

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
        <button type="submit" :disabled="cannotAddTodo"
          :class="`${colorsSubmitButton} self-stretch rounded-sm px-3 py-2`">
          <Plus :size="20"></Plus>
        </button>
      </div>
    </div>
  </form>
</template>