<script setup lang="ts">
import { inject, ref, Teleport, Transition, watch } from 'vue';
import { Check, FileDown, Settings } from 'lucide-vue-next';
import LocalStorage from '../../repositories/localStorage';
import TodoRepo from '../../repositories/todoRepo';
import Modal from '../Modal.vue';
import Clock from './Clock.vue';

const configStorage = inject<LocalStorage>('local-storage', new LocalStorage);
const repo = inject<TodoRepo>('repo', new TodoRepo);

const isManagingApp = ref(false);
const showClockOffline = ref((configStorage.getItem('show_clock.offline') || true) == true);
const showClockOnline = ref((configStorage.getItem('show_clock.online') || false) == true);
const exportFileName = ref('');

const exportDB = () => {
  repo.exportDB().then((d) => {
    const filename = `${exportFileName.value ?? 'todo_wild_data'}.v${d.version}.${(new Date).getTime()}.json`;
    const blob = new Blob([JSON.stringify(d)], {
      type: 'application/json'
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  });
};

watch(showClockOffline, (value) => {
  configStorage.setItem('show_clock.offline', value);
});
watch(showClockOnline, (value) => {
  configStorage.setItem('show_clock.online', value);
});
</script>

<template>
  <div>
    <div class="flex flex-row items-center justify-between w-full md:flex-col md:items-start md:justify-normal">
      <div class="flex md:flex-col items-center md:items-start">
        <img src="/icon-192.png" class="inline me-3 mb-0 md:block md:me-0 md:mb-3 w-full max-w-10 md:max-w-20 dark:brightness-90" alt="To Do Wild" />
        <div class="flex items-center md:items-start gap-x-2 md:gap-x-0">
          <div class="inline-block">
            <h1 class="font-bold inline" translate="no">To Do Wild</h1>
            <span class="hidden md:inline">: an offline first to do app.</span>
          </div>
          <button type="button" @click="isManagingApp = true"
            class=" float-end rounded-sm p-2 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-900">
            <Settings :size="16"></Settings>
          </button>
        </div>
      </div>
      <div class="md:my-4 md:w-full">
        <div class="flex flex-row md:flex-row-col items-center md:justify-between gap-x-2 gap-y-1">
          <Clock :show-offline="showClockOffline" :show-online="showClockOnline" class="text-slate-700" />
        </div>
      </div>
    </div>
    <Teleport to="body">
      <Transition
        enter-active-class="transition-all"
        leave-active-class="transition-all"
        enter-from-class="opacity-0 translate-y-2"
        leave-to-class="opacity-0 translate-y-2">
        <Modal v-if="isManagingApp" @close="isManagingApp = false">
          <div class="p-6 flex flex-col gap-y-3">
            <h2>manage this app.</h2>
            <div class="py-2">
              <h3 class="font-bold mb-2">clock configuration</h3>
              <div class="flex flex-col gap-y-2">
                <div>
                  when offline,
                  <div class="mx-1 inline-flex items-center border border-separate rounded shadow overflow-hidden dark:border-gray-700">
                    <label>
                      <input class="hidden peer" type="radio" v-model="showClockOffline" :value="true">
                      <span class="px-2 py-1 inline-block peer-checked:text-blue-700 peer-checked:bg-blue-200 dark:peer-checked:text-blue-200 dark:peer-checked:bg-blue-900">
                        <Check v-if="showClockOffline" :size="12" class="inline-block"></Check>
                        show
                      </span>
                    </label>
                    <label>
                      <input class="hidden peer" type="radio" v-model="showClockOffline" :value="false">
                      <span class="px-2 py-1 inline-block peer-checked:text-red-700 peer-checked:bg-red-200 dark:peer-checked:text-red-200 dark:peer-checked:bg-red-900">
                        <Check v-if="!showClockOffline" :size="12" class="inline-block"></Check>
                        hide
                      </span>
                    </label>
                  </div>
                  the clock.
                </div>
                <div>
                  when online,
                  <div class="mx-1 inline-flex items-center border border-separate rounded shadow overflow-hidden dark:border-gray-700">
                    <label>
                      <input class="hidden peer" type="radio" v-model="showClockOnline" :value="true">
                      <span class="px-2 py-1 inline-block peer-checked:text-blue-700 peer-checked:bg-blue-200 dark:peer-checked:text-blue-200 dark:peer-checked:bg-blue-900">
                        <Check v-if="showClockOnline" :size="12" class="inline-block"></Check>
                        show
                      </span>
                    </label>
                    <label>
                      <input class="hidden peer" type="radio" v-model="showClockOnline" :value="false">
                      <span class="px-2 py-1 inline-block peer-checked:text-red-700 peer-checked:bg-red-200 dark:peer-checked:text-red-200 dark:peer-checked:bg-red-900">
                        <Check v-if="!showClockOnline" :size="12" class="inline-block"></Check>
                        hide
                      </span>
                    </label>
                  </div>
                  the clock.
                </div>
              </div>
            </div>
            <div class="py-2">
              <h3 class="font-bold mb-2">import/export</h3>
              <div class="flex flex-col gap-2">
                <div class="flex flex-row gap-1">
                  <div class="shrink">
                    <input type="text" v-model="exportFileName" placeholder="file name (optional)" class="rounded border-gray-500 bg-transparent w-full">
                  </div>
                  <button type="button" @click="exportDB"
                    class="px-4 py-2 rounded bg-slate-200 hover:bg-slate-300 dark:bg-slate-800 dark:hover:bg-slate-700 shrink-0">
                    <!-- <FileDown :size="16"></FileDown> -->
                    export
                  </button>
                </div>
                <!-- <div>import</div> -->
              </div>
            </div>
          </div>
        </Modal>
      </Transition>
    </Teleport>
  </div>
</template>