<script setup lang="ts">
import Clock from './components/Clock.vue';
import Todo from './components/Todo.vue';
</script>

<template>
  <div class="flex flex-col h-full min-h-full">
    <div class="grow">
      <div class="container mx-auto max-w-4xl">
        <div class="flex flex-col mt-0 gap-5 md:flex-row md:my-5">
          <div class="flex flex-col gap-3 mt-5 px-4 md:my-5 md:max-w-80 xl:max-w-96">
            <div class="flex flex-row items-center justify-between  md:flex-col md:items-start md:justify-normal">
              <div>
                <img src="/icon-192.png" class="inline me-3 mb-0 md:block md:me-0 md:mb-3 w-full max-w-10 md:max-w-20 dark:brightness-90" alt="To Do Wild" />
                <div class="inline-block text-nowrap">
                  <h1 class="font-bold inline" translate="no">To Do Wild</h1>
                  <span class="hidden md:inline">: an offline first to do app.</span>
                </div>
              </div>
              <Clock class="md:my-4 text-slate-700" />
            </div>
          </div>
          <main class="w-full mt-0 md:my-3 md:grow">
            <Todo />
          </main>
        </div>
      </div>
    </div>
    <footer class="py-5 px-3 text-center text-gray-400 text-sm">
      &copy; 2024~ by <a href="https://github.com/yuptogun/todo-wild/" target="_blank" class="text-gray-400 hover:text-gray-600 underline underline-offset-4" translate="no">yuptogun</a>
      <span class="mx-1">&middot;</span>
      <a href="https://github.com/RandomMaerks/Overused-Grotesk" target="_blank" rel="noopener noreferrer"
        class="underline underline-offset-4 text-gray-400 hover:text-gray-600" translate="no">Overused Grotesk</a> by <span translate="no">RandomMaerks</span>
    </footer>
  </div>
</template>