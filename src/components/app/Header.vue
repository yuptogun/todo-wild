<script setup lang="ts">
import { inject, Ref, ref, Teleport, Transition, watch } from 'vue';
import { Check, Settings } from 'lucide-vue-next';
import Modal from '../composables/Modal.vue';
import Clock from './Clock.vue';

const config = inject('localStorage') as Ref<{
  show_clock: {
    offline: boolean,
    online: boolean
  }
}>;

const isManagingApp = ref(false);
const showClockOffline = ref((config.value.show_clock?.offline ?? true) == true);
const showClockOnline = ref((config.value.show_clock?.online ?? false) == true);

watch(showClockOffline, (value) => {
  config.value.show_clock.offline = value;
});
watch(showClockOnline, (value) => {
  config.value.show_clock.online = value;
});
</script>

<template>
  <div>
    <div class="flex flex-row items-center justify-between w-full md:flex-col md:items-start md:justify-normal md:ms-2">
      <div class="flex md:flex-col items-center md:items-start">
        <img src="/icon-192.png" class="inline me-3 mb-0 md:block md:me-0 md:mb-3 w-full max-w-10 md:max-w-20 dark:brightness-90" alt="To Do Wild" />
        <div class="flex items-center md:items-start gap-x-2 md:gap-x-0">
          <div class="inline-block">
            <h1 class="font-bold inline" translate="no">To Do Wild</h1>
            <span class="hidden md:inline">: an offline first to do app.</span>
          </div>
        </div>
      </div>
      <div class="md:my-4 md:w-full">
        <div class="flex flex-row md:flex-row-col items-center md:justify-between gap-x-2 gap-y-1">
          <Clock :show-offline="showClockOffline" :show-online="showClockOnline" class="text-slate-700" />
          <button type="button" @click="isManagingApp = true"
            class=" float-end rounded-sm p-2 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-900">
            <Settings :size="16"></Settings>
          </button>
        </div>
      </div>
    </div>
    <Modal :show="isManagingApp" @close="isManagingApp = false">
      <div class="p-6 flex flex-col gap-y-3">
        <h2 class="text-lg font-bold">Manage app</h2>
        <div class="py-2">
          <h3 class="font-bold mb-2">clock configuration</h3>
          <div class="flex flex-col gap-y-2">
            <div>
              when offline,
              <div class="mx-1 inline-flex items-center border border-separate rounded shadow overflow-hidden dark:border-gray-700">
                <label>
                  <input class="hidden peer" type="radio" v-model="showClockOffline" :value="true">
                  <span class="px-2 py-1 inline-block peer-checked:text-blue-700 peer-checked:bg-blue-200">
                    <Check v-if="showClockOffline" :size="12" class="inline-block"></Check>
                    show
                  </span>
                </label>
                <label>
                  <input class="hidden peer" type="radio" v-model="showClockOffline" :value="false">
                  <span class="px-2 py-1 inline-block peer-checked:text-red-700 peer-checked:bg-red-200">
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
                  <span class="px-2 py-1 inline-block peer-checked:text-blue-700 peer-checked:bg-blue-200">
                    <Check v-if="showClockOnline" :size="12" class="inline-block"></Check>
                    show
                  </span>
                </label>
                <label>
                  <input class="hidden peer" type="radio" v-model="showClockOnline" :value="false">
                  <span class="px-2 py-1 inline-block peer-checked:text-red-700 peer-checked:bg-red-200">
                    <Check v-if="!showClockOnline" :size="12" class="inline-block"></Check>
                    hide
                  </span>
                </label>
              </div>
              the clock.
            </div>
          </div>
        </div>
      </div>
    </Modal>
  </div>
</template>