<script setup lang="ts">
import { inject, onMounted, ref } from 'vue';
import { ChevronDown, ChevronUp, Folder, FolderCog, Plus } from 'lucide-vue-next';
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
const listSelected = ref(unlisted);

const getLists = () => {
  repo.getAllList().then((l: List[]) => {
    lists.value = [unlisted].concat(l);
  });
};
const loadSelectedList = () => {
  if (listID.value) {
    repo.getList(listID.value.toString()).then((list) => {
      listSelected.value = list;
    });
  } else {
    listSelected.value = unlisted;
  }
};
const addNewList = () => {
  repo.createList(new ListTodo(newListName.value)).then((newListID) => {
    selectList(newListID.toString());
    getLists();
    isManagingLists.value = false;
    newListName.value = '';
  });
};
const selectList = (id?: string) => {
  isSelectingList.value = false;
  if (id) {
    window.localStorage.setItem('selectedListID', id);
    listID.value = id;
    repo.getList(id).then((list) => listSelected.value = list);
  } else {
    window.localStorage.removeItem('selectedListID');
    listID.value = null;
    listSelected.value = unlisted;
  }
};
const onListDeleted = (deletedListId: Number) => {
  if (deletedListId == listID.value) {
    listID.value = deletedListId.toString();
  } else {
    init();
    if (deletedListId == listSelected.value.id) {
      selectList();
    }
  }
};
const init = () => {
  getLists();
  loadSelectedList();
};

onMounted(init);
</script>

<template>
  <div>
    <div class="flex flex-row justify-between items-center">
      <div class="relative">
        <button class="flex gap-x-2 px-2 py-1 items-center hover:bg-gray-100" @click="isSelectingList = !isSelectingList">
          <Folder :size="16" class="inline"></Folder>
          <h2 class="inline font-bold">{{ listSelected.name }}</h2>
          <ChevronDown v-if="!isSelectingList" :size="16"></ChevronDown>
          <ChevronUp v-else :size="16"></ChevronUp>
        </button>
        <Transition>
          <ul v-if="isSelectingList && !isManagingLists"
            class="absolute top-full mt-1 border rounded shadow-md z-10 bg-white dark:bg-gray-950">
            <li v-for="l in lists" :key="`list-${l.id || 'undefined'}`"
              @click="selectList(l.id?.toString())"
              :class="`flex items-start gap-x-2 px-3 py-2 cursor-pointer hover:bg-gray-100 active:bg-gray-200 ${listID == l.id?.toString() ? 'bg-gray-200' : ''}`">
              <span class="pt-1">
                <Folder :size="16"></Folder>
              </span>
              <span class=" break-all w-36 max-w-36">{{ l.name }}</span>
            </li>
          </ul>
        </Transition>
      </div>
      <div>
        <button type="button" @click="isManagingLists = true"
          class="rounded-sm p-2 text-slate-500 hover:bg-slate-100">
          <FolderCog :size="16"></FolderCog>
        </button>
      </div>
    </div>
    <Teleport to="body">
      <Modal v-if="isManagingLists" @close="isManagingLists = false">
        <div class="p-6 flex flex-col gap-y-3">
          <h2>manage todo lists.</h2>
          <ul class="rounded border shadow">
            <template v-for="l in lists" :key="l.id">
              <ListItem v-if="l.id" :list="l" class="p-3 border-b" @list-edited="init" @list-deleted="onListDeleted"></ListItem>
            </template>
            <li class="p-3">
              <form @submit="addNewList" class="flex flex-row gap-3">
                <input type="text" v-model="newListName" class="border-0 p-0 w-full focus:ring-0" placeholder="new list name" required />
                <button type="submit" :disabled="!newListName.trim().length"
                  class="rounded-sm px-3 py-2 bg-gray-800 text-white disabled:bg-gray-200 disabled:text-gray-400 focus-visible:outline-offset-2 focus-visible:outline-gray-800">
                  <Plus :size="18"></Plus>
                </button>
              </form>
            </li>
          </ul>
        </div>
      </Modal>
    </Teleport>
  </div>
</template>