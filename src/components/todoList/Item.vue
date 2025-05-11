<script setup lang="ts">
import { inject, ref } from 'vue';
import { Check, Pencil, Trash2 } from 'lucide-vue-next';
import TodoRepo from '../../repositories/todoRepo';
import List from '../../entities/list';

const repo = inject<TodoRepo>('repo', new TodoRepo());
const emit = defineEmits(['listEdited', 'listDeleted']);
const { list } = defineProps<{
  list: List
}>();

const isEditing = ref(false);

const editList = () => {
  repo.updateList(list).then(() => {
    isEditing.value = false;
    emit('listEdited');
  });
};
const deleteList = () => {
  const warning = `Are you sure?\n(All todos in '${list.name}' will be moved to "All" list.)`;
  if (confirm(warning)) {
    repo.deleteList(list).then(() => {
      isEditing.value = false;
      emit('listDeleted', list.id);
    });
  }
};
</script>

<template>
  <div>
    <form v-if="isEditing" class="flex items-center gap-3" @submit.prevent="editList">
      <div class="w-full">
        <input v-model="list.name" :placeholder="list.name" type="text" required
          class="w-full form-input rounded-sm" />
      </div>
      <div class="shrink">
        <div class="flex items-center gap-2">
          <button type="submit"
            :disabled="list.name.trim() === ''"
            class="rounded px-3 py-2 text-sm text-white bg-gray-600 hover:bg-gray-700 disabled:bg-gray-200 disabled:text-gray-400 focus-visible:outline-offset-2 focus-visible:outline-gray-700">
            <Check :size="16"></Check>
          </button>
        </div>
      </div>
    </form>
    <div v-else class="flex items-center justify-between">
      <div class="ps-2">{{ list.name }}</div>
      <div class="flex flex-row gap-x-1">
        <button type="button" @click="deleteList"
          class="rounded-sm p-2 text-red-500 hover:bg-red-100">
          <Trash2 :size="16"></Trash2>
        </button>
        <button type="button" @click.stop="isEditing = true"
          class="rounded-sm p-2 text-gray-500 hover:bg-gray-100">
          <Pencil :size="16"></Pencil>
        </button>
      </div>
    </div>
  </div>
</template>