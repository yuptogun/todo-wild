<script setup lang="ts">
import { computed, inject, onMounted, ref } from 'vue';
import { ChevronDown, ChevronUp, Folder, FolderCog, Plus } from 'lucide-vue-next';
import { colorsSubmitButton, getLastSelectedListID, setLastSelectedListID, unsetLastSelectedListID } from '../../global/functions';
import TodoRepo from '../../repositories/todoRepo';
import List from '../../entities/list';
import ListTodo from '../../dtos/list/create';
import Modal from '../Modal.vue';
import ListItem from './Item.vue';

const repo = inject<TodoRepo>('repo', new TodoRepo());
const listID = defineModel();

const unlisted: List = {
  id: undefined,
  name: 'All',
  deleted: false
};
const lists = ref([] as List[]);
const newListName = ref('');
const isManagingLists = ref(false);
const isSelectingList = ref(false);
const listSelected = ref(unlisted); // default "unlisted" because default listID undefined
const hasUserCreatedLists = computed(() => lists.value.length > 1);

const willGetLists = () => {
  return new Promise<void>((resolve) => {
    repo.getAllList().then((l: List[]) => {
      lists.value = [unlisted].concat(l);
      resolve();
    });
  });
};
const loadSelectedList = () => {
  if (!listID.value) {
    listSelected.value = unlisted;
  } else {
    repo.getList(listID.value as number).then((list) => {
      listSelected.value = list;
    }).catch(() => {
      listSelected.value = unlisted;
    });
  }
};
const addNewList = () => {
  repo.createList(new ListTodo(newListName.value)).then((newListID) => {
    newListID = parseInt(newListID.toString());
    setLastSelectedListID(newListID);
    willGetLists().then(() => selectList(newListID));
    listID.value = newListID;
    isManagingLists.value = false;
    newListName.value = '';
  });
};
const toggleListSelect = () => {
  if (hasUserCreatedLists.value) {
    isSelectingList.value = !isSelectingList.value;
  }
}
const selectList = (id?: number) => {
  isSelectingList.value = false;
  if (id) {
    setLastSelectedListID(id);
    listID.value = id;
    repo.getList(id).then((list) => listSelected.value = list);
  } else {
    unsetLastSelectedListID();
    listID.value = null;
    listSelected.value = unlisted;
  }
};
const onListDeleted = (deletedListId: Number) => {
  if (getLastSelectedListID() == deletedListId) {
    unsetLastSelectedListID();
  }
  if (listID.value == deletedListId) {
    isManagingLists.value = false;
    listID.value = null;
  }
  init();
};
const init = () => willGetLists().then(() => loadSelectedList);

onMounted(init);
</script>

<template>
  <div>
    <div class="px-4 flex flex-row justify-between items-center">
      <div class="relative">
        <button :class="`px-2 py-1 flex gap-x-2 rounded items-center ` + (hasUserCreatedLists ? 'hover:bg-gray-100 dark:hover:bg-gray-800' : '') + (isSelectingList ? ' bg-gray-100 dark:bg-gray-800' : '')" @click="toggleListSelect">
          <Folder :size="16"></Folder>
          <h2 class="inline font-bold">{{ listSelected.name }}</h2>
          <template v-if="hasUserCreatedLists">
            <ChevronDown :size="16" v-if="!isSelectingList"></ChevronDown>
            <ChevronUp :size="16" v-else></ChevronUp>
          </template>
        </button>
        <Transition
          enter-from-class="opacity-0 -translate-y-2"
          enter-active-class="transition-all"
          leave-active-class="transition-all"
          leave-to-class="opacity-0 -translate-y-2">
          <ul v-if="isSelectingList && !isManagingLists"
            class="absolute top-full mt-1 border rounded shadow-md z-10 bg-white dark:bg-gray-950 dark:border-gray-700">
            <li v-for="l in lists" :key="`list-${l.id || 'undefined'}`"
              @click="selectList(l.id)"
              :class="`flex items-start gap-x-2 px-3 py-2 cursor-pointer hover:bg-gray-100 active:bg-gray-200 dark:hover:bg-gray-900 dark:active:bg-gray-900 ${listID == l.id ? 'bg-gray-200 dark:bg-gray-800' : ''}`">
              <span class="pt-1">
                <Folder :size="16"></Folder>
              </span>
              <span class="break-all w-36 max-w-36">{{ l.name }}</span>
            </li>
          </ul>
        </Transition>
      </div>
      <div>
        <button type="button" @click="isManagingLists = true"
          class="rounded-sm p-2 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-900">
          <FolderCog :size="16"></FolderCog>
        </button>
      </div>
    </div>
    <Teleport to="body">
      <Transition
        enter-active-class="transition-all"
        leave-active-class="transition-all"
        enter-from-class="opacity-0 translate-y-2"
        leave-to-class="opacity-0 translate-y-2">
        <Modal v-if="isManagingLists" @close="isManagingLists = false">
          <div class="p-6 flex flex-col gap-y-3">
            <h2>manage todo lists.</h2>
            <ul class="rounded border shadow dark:border-gray-600">
              <template v-for="l in lists" :key="l.id">
                <ListItem v-if="l.id" :list="l" class="p-3 border-b dark:border-gray-600" @list-edited="init" @list-deleted="onListDeleted(l.id)"></ListItem>
              </template>
              <li class="p-3">
                <form @submit="addNewList" class="flex flex-row gap-3">
                  <input type="text" v-model="newListName" class="border-0 p-0 w-full focus:ring-0 bg-transparent" placeholder="new list name" required />
                  <button type="submit" :disabled="!newListName.trim().length"
                    :class="`rounded-sm px-3 py-2 ${colorsSubmitButton}`">
                    <Plus :size="18"></Plus>
                  </button>
                </form>
              </li>
            </ul>
          </div>
        </Modal>
      </Transition>
    </Teleport>
  </div>
</template>