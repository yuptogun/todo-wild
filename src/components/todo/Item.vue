<script setup lang="ts">
import { inject, Ref, ref } from 'vue';
import { Archive, ArchiveRestore, ArrowRight, Check, Pencil } from 'lucide-vue-next';
import { colorsSubmitButton } from '../../global/functions';
import TodoRepo from '../../repositories/todoRepo';
import Todo from '../../entities/todo';
import List from '../../entities/list';
import Modal from '../composables/Modal.vue';

enum Mode {
  Show,
  Edit,
}

const emit = defineEmits(['deleteTodo', 'editTodo']);
const repo = inject<TodoRepo>('repo', new TodoRepo());
const todo: Ref<Todo> = defineModel({ required: true });
const mode: Ref<Mode> = ref(Mode.Show);
const newName = ref('');
const newListId = ref(todo.value.list_id || 0);
const editTodoInputID = `todoName${todo.value.id}`;
const editListInputID = `todoListID${todo.value.id}`;
const todoLists: Ref<List[]> = ref([]);

const isEditing = () => mode.value === Mode.Edit;
const startEditing = () => {
  repo.getAllList().then((lists) => {
    todoLists.value = lists;
    todoLists.value.unshift({
      id: 0,
      name: 'Unlisted',
      deleted: false
    });
    mode.value = Mode.Edit;
  });
};
const showItem = () => mode.value = Mode.Show;

const editName = () => {
  todo.value.todo = newName.value.trim();
  emit('editTodo', todo);
};
const editListID = () => {
  todo.value.list_id = newListId.value || undefined;
  emit('editTodo', todo);
  showItem();
};
const deleteTodo = () => {
  if (confirm(`you sure '${todo.value.todo}' can be gone for good?`)) {
    emit('deleteTodo', todo.value.id);
  }
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
  <div>
    <div class="flex items-center gap-3">
      <label class="grow cursor-pointer" :class="{ 'line-through text-gray-400': todo.isDone() || todo.isClosed() }">
        <div class="flex items-start gap-3 h-full">
          <input type="checkbox" class="form-checkbox bg-transparent dark:focus:ring-offset-black rounded-sm mt-1"
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
              class="rounded-sm p-2 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-900"
              @click="archiveTodo(todo)">
              <Archive :size="16"></Archive>
            </button>
          </template>
          <template v-else-if="todo.isClosed()">
            <button type="button"
              class="rounded-sm p-2 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-900"
              @click="reopenTodo(todo)">
              <ArchiveRestore :size="16"></ArchiveRestore>
            </button>
          </template>
          <template v-else>
            <!-- <button type="button" @click="startEditing()"
              class="rounded-sm p-2 text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-900">
            </button> -->
            <button type="button" @click="startEditing()"
            class="rounded-sm p-2 text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-900">
              <Pencil :size="16"></Pencil>
             <!-- <Ellipsis :size="16"></Ellipsis> -->
            </button>
            <!-- <Dropdown align-x="right" :show-chevron="false"
              button-classnames=""
              @deleteTodo="$emit('deleteTodo', todo.id)">
              <template #button>
              </template>
              <template #dropdown>
                <li @click="$emit('deleteTodo', todo.id)"
                  class="text-sm px-3 py-2 cursor-pointer text-red-500 hover:bg-red-100 dark:hover:bg-red-900">
                  delete
                </li>
              </template>
            </Dropdown> -->
          </template>
        </div>
      </div>
    </div>
    <Modal :show="isEditing()" @close="showItem()">
      <div class="p-6 flex flex-col gap-y-3">
        <h2 class="text-lg font-bold">Manage todo '{{ todo.todo }}'</h2>
        <div class="flex flex-col gap-3">
          <form class="flex flex-col gap-1 md:flex-row md:gap-5" @submit.prevent="editName()">
            <label :for="editTodoInputID" class="flex items-center">rename</label>
            <div class="flex flex-col gap-3 grow">
              <div class="flex items-center gap-3">
                <div class="grow">
                  <div class="w-full">
                    <input type="text" class="w-full form-input rounded-sm bg-transparent" :id="editTodoInputID" required
                      :placeholder="`new name besides '${todo.todo}'`"
                      v-model="newName" />
                  </div>
                </div>
                <button type="submit"
                  :disabled="newName.trim() === '' || todo.todo === newName.trim()"
                  :class="`${colorsSubmitButton} self-stretch rounded-sm px-3 py-2 text-sm`">
                  <Check :size="16"></Check>
                </button>
              </div>
            </div>
          </form>
          <form class="flex flex-col gap-1 md:flex-row md:gap-5" @submit.prevent="editListID()">
            <label :for="editListInputID" class="flex items-center">reallocate</label>
            <div class="flex flex-col gap-3 grow">
              <div class="flex items-center gap-3">
                <div class="grow">
                  <div class="w-full">
                    <select class="w-full form-input rounded-sm bg-transparent" :id="editListInputID" v-model="newListId">
                      <option value="" disabled>Select a list</option>
                      <option v-for="list in todoLists" :key="list.id" :value="list.id"
                        :selected="list.id == todo.list_id"
                        :disabled="list.id == todo.list_id">
                        {{ list.name }}
                      </option>
                    </select>
                  </div>
                </div>
                <button type="submit"
                  :disabled="newListId == (todo.list_id || 0)"
                  :class="`${colorsSubmitButton} self-stretch rounded-sm px-3 py-2 text-sm`">
                  <ArrowRight :size="16"></ArrowRight>
                </button>
              </div>
            </div>
          </form>
          <div class="text-end">
            <button type="button" @click="deleteTodo"
              class="rounded-sm px-3 py-2 text-sm text-red-500 hover:bg-red-100 dark:hover:bg-red-900">
              Delete
            </button>
          </div>
        </div>
      </div>
    </Modal>
  </div>
</template>