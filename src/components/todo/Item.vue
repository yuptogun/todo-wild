<script setup lang="ts">
import { Ref, ref } from 'vue';
import { Archive, ArchiveRestore, Check, Pencil, Trash2 } from 'lucide-vue-next';
import Todo from '../../entities/todo';

const emit = defineEmits(['deleteTodo', 'editTodo']);
const todo: Ref<Todo> = defineModel({ required: true });
const mode = ref('show');

const isEditing = () => mode.value === 'edit';
const startEditing = () => mode.value = 'edit';
const stopEditing = () => mode.value = 'show';

const edit = () => {
  emit('editTodo', todo);
  stopEditing();
};

const markTodo = (todo: Todo, event: Event) => {
  (event.target as HTMLInputElement).checked ? todo.markDone() : todo.markUndone();
  emit('editTodo', todo);
}
const archiveTodo = (todo: Todo) => {
  todo.archive();
  emit('editTodo', todo);
}
const reopenTodo = (todo: Todo) => {
  todo.markUndone();
  emit('editTodo', todo);
}
</script>

<template>
  <div v-if="isEditing()">
    <form class="flex items-center" @submit.prevent="edit()">
      <div class="grow">
        <div class="w-full pe-3">
          <input type="text" class="w-full form-input rounded-sm" :id="`editTodoInput${todo.id}`" required
            :placeholder="todo.todo"
            v-model="todo.todo" />
        </div>
      </div>
      <div class="shrink">
        <div class="flex items-center gap-2">
          <button type="submit"
            :disabled="todo.todo.trim() === ''"
            class="rounded-sm px-2 py-1 text-sm text-white bg-gray-600 hover:bg-gray-700 disabled:bg-gray-200 disabled:text-gray-400 focus-visible:outline-offset-2 focus-visible:outline-gray-700">
            <Check :size="16"></Check>
          </button>
        </div>
      </div>
    </form>
  </div>
  <div v-else>
    <div class="flex items-center">
      <label class="grow cursor-pointer" :class="{ 'line-through text-slate-400': todo.isDone() || todo.isClosed() }">
        <div class="flex items-start gap-3 h-full">
          <input type="checkbox" class="form-checkbox rounded-sm mt-1"
            :id="`checkTodo${todo.id}`"
            :checked="todo.isDone() || todo.isClosed()"
            :disabled="todo.isClosed()"
            @change="markTodo(todo, $event)" />
          <div class="break-all me-3">{{ todo.todo }}</div>
        </div>
      </label>
      <div class="shrink">
        <div class="flex items-center gap-1">
          <template v-if="todo.isDone()">
            <button type="button"
              class="rounded-sm p-2 text-slate-500 hover:bg-slate-100"
              @click="archiveTodo(todo)">
              <Archive :size="16"></Archive>
            </button>
          </template>
          <template v-else-if="todo.isClosed()">
            <button type="button"
              class="rounded-sm p-2 text-slate-500 hover:bg-slate-100"
              @click="reopenTodo(todo)">
              <ArchiveRestore :size="16"></ArchiveRestore>
            </button>
          </template>
          <template v-else>
            <button type="button" @click="$emit('deleteTodo', todo.id)"
              class="rounded-sm p-2 text-red-500 hover:bg-red-100">
              <Trash2 :size="16"></Trash2>
            </button>
            <button type="button" @click="startEditing()"
              class="rounded-sm p-2 text-gray-500 hover:bg-gray-100">
              <Pencil :size="16"></Pencil>
            </button>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>