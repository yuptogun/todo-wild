<script setup lang="ts">
import Todo from './components/Todo.vue';
</script>

<template>
  <div class="flex flex-col min-h-screen">
    <div class="grow">
      <div class="container mx-auto px-5">
        <div class="flex flex-col mt-0 lg:flex-row lg:my-5 lg:gap-5">
          <div class="mt-5 lg:my-5 lg:pe-5 lg:max-w-80 xl:max-w-96">
            <img src="/icon-192.png" class="inline me-3 lg:block lg:me-0 mb-3 w-full max-w-10 md:max-w-20" alt="To Do Wild" />
            <strong translate="no">To Do Wild</strong>
            <span class="hidden md:inline">: a to-do web app that (supposedly) works off the grid.</span>
          </div>
          <main class="mt-0 lg:my-3 w-100 lg:grow">
            <Todo />
          </main>
        </div>
      </div>
    </div>
    <footer class="my-5 text-center text-gray-400 text-sm">
      &copy; 2024~ by <a href="//yuptogun.com" target="_blank" class="text-gray-400 hover:text-gray-600 underline underline-offset-4" translate="no">yuptogun</a>
      <span class="mx-1">&middot;</span>
      <a href="//github.com/RandomMaerks/Overused-Grotesk" target="_blank" rel="noopener noreferrer"
          class="underline underline-offset-4 text-gray-400 hover:text-gray-600" translate="no">Overused Grotesk</a> by <span translate="no">RandomMaerks</span>
    </footer>
  </div>
</template>