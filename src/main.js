import { createApp } from 'vue';
import { registerSW } from 'virtual:pwa-register';
import IndexedDB from './plugins/IndexedDB';
import LocalStorage from './plugins/LocalStorage';
import App from './App.vue';
import './style.css';

const app = createApp(App);

app.use(IndexedDB).use(LocalStorage);
app.mount('#app');

registerSW({
  immediate: true
});