<script setup lang="ts">
import { computed, inject, onMounted, Ref, ref, useTemplateRef } from 'vue';
import { Folder, FolderCog, Plus } from 'lucide-vue-next';
import { colorsSubmitButton } from '../../global/functions';
import TodoRepo from '../../repositories/todoRepo';
import List from '../../entities/list';
import ListTodo from '../../dtos/list/create';
import Modal from '../composables/Modal.vue';
import Dropdown from '../composables/Dropdown.vue';
import ListItem from './Item.vue';

const listID = defineModel();
const repo = inject<TodoRepo>('repo', new TodoRepo());
const localStorage = inject('localStorage') as Ref<{ selected_list_id: number }>;

const unlisted: List = {
  id: 0,
  name: 'Unlisted',
  deleted: false
};
const lists = ref([] as List[]);
const newListName = ref('');
const isManagingLists = ref(false);
const isSelectingList = ref(false);
const listSelected = ref(unlisted); // default "unlisted" because default listID undefined
const hasUserCreatedLists = computed(() => lists.value.length > 1);
const todoListDropdown = useTemplateRef('todoListDropdown');

const willGetLists = () => {
  return new Promise<void>((resolve) => {
    repo.getAllList().then((l: List[]) => {
      lists.value = [unlisted].concat(l);
      resolve();
    });
  });
};
const setSelectedList = () => {
  if (!listID.value) {
    listSelected.value = unlisted;
  } else {
    repo.getList(listID.value as number).then((list) => {
      listSelected.value = list;
    }).catch((e) => {
      console.warn('failed to load selected list', e);
      listSelected.value = unlisted;
    });
  }
};
const init = () => willGetLists().then(setSelectedList);
const selectList = (id: number) => {
  // UI first
  isSelectingList.value = false;
  todoListDropdown.value?.closeDropdown();

  // model next
  localStorage.value.selected_list_id = id;
  listID.value = id;

  // action last
  init();
};
const onCreateList = () => {
  repo.createList(new ListTodo(newListName.value)).then((newListID) => {
    isManagingLists.value = false;
    newListName.value = '';
    selectList(parseInt(newListID.toString()));
  });
};
const onDeleteList = (deletedListId: Number) => {
  if (deletedListId == localStorage.value.selected_list_id) {
    localStorage.value.selected_list_id = 0;
  }
  if (deletedListId == listID.value) {
    isManagingLists.value = false;
    listID.value = 0;
  }
  init();
};

onMounted(init);
</script>

<template>
  <div>
    <div class="px-4 flex flex-row justify-between items-center">
      <Dropdown
        ref="todoListDropdown"
        :z-index="11"
        :button-classnames="`px-2 py-1 flex gap-x-2 rounded items-center ` + (hasUserCreatedLists ? 'hover:bg-gray-100 dark:hover:bg-gray-800' : '') + (isSelectingList ? ' bg-gray-100 dark:bg-gray-800' : '')">
        <template #button>
          <Folder :size="16"></Folder>
          <h2 class="inline font-bold">{{ listSelected.name }}</h2>
        </template>
        <template #dropdown>
          <li v-for="l in lists" :key="`list-${l.id || 'undefined'}`"
            @click="selectList(l.id)"
            :class="`flex items-start gap-x-2 px-3 py-2 cursor-pointer hover:bg-gray-100 active:bg-gray-200 dark:hover:bg-gray-900 dark:active:bg-gray-900 ${listID == l.id ? 'bg-gray-200 dark:bg-gray-800' : ''}`">
            <span class="pt-1">
              <Folder :size="16"></Folder>
            </span>
            <span class="break-all w-36 max-w-36">{{ l.name }}</span>
          </li>
        </template>
      </Dropdown>
      <div>
        <button type="button" @click="isManagingLists = true"
          class="rounded-sm p-2 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-900">
          <FolderCog :size="16"></FolderCog>
        </button>
      </div>
    </div>
    <Modal :show="isManagingLists" @close="isManagingLists = false">
      <div class="p-6 flex flex-col gap-y-3">
        <h2>manage todo lists.</h2>
        <div class="rounded border shadow dark:border-gray-600">
          <div class="p-3 border-b dark:border-gray-600">
            <form @submit.prevent="onCreateList" class="flex flex-row gap-3">
              <input type="text" v-model="newListName" class="border-0 p-0 ps-1 w-full focus:ring-0 bg-transparent" placeholder="new list name" required />
              <button type="submit" :disabled="!newListName.trim().length"
                :class="`rounded-sm px-3 py-2 ${colorsSubmitButton}`">
                <Plus :size="18"></Plus>
              </button>
            </form>
          </div>
          <ul>
            <li v-for="l in lists.filter(l => l.id !== 0)" :key="l.id" class="border-b dark:border-gray-600 last-of-type:border-0">
              <ListItem :list="l" class="p-3" @list-edited="init" @list-deleted="onDeleteList(l.id)"></ListItem>
            </li>
          </ul>
        </div>
      </div>
    </Modal>
  </div>
</template>