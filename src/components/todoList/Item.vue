<script setup lang="ts">
import { inject, ref } from 'vue';
import { Check, Pencil, Trash2 } from 'lucide-vue-next';
import TodoRepo from '../../repositories/todoRepo';
import List from '../../entities/list';
import { colorsSubmitButton } from '../../global/functions';

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
        <input v-model="list.name" :placeholder="list.name" type="text" class="w-full form-input rounded-sm bg-transparent" required />
      </div>
      <div class="shrink">
        <div class="flex items-center gap-2">
          <button type="submit"
            :disabled="list.name.trim() === ''"
            :class="`rounded px-3 py-2 text-sm ${colorsSubmitButton}`">
            <Check :size="16"></Check>
          </button>
        </div>
      </div>
    </form>
    <div v-else class="flex items-center justify-between">
      <div class="ps-2">{{ list.name }}</div>
      <div class="flex flex-row gap-x-1">
        <button type="button" @click="deleteList"
          class="rounded-sm p-2 text-red-500 hover:bg-red-100 dark:hover:bg-red-900">
          <Trash2 :size="16"></Trash2>
        </button>
        <button type="button" @click.stop="isEditing = true"
          class="rounded-sm p-2 text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-900">
          <Pencil :size="16"></Pencil>
        </button>
      </div>
    </div>
  </div>
</template>