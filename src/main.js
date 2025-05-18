import { createApp } from 'vue';
import IndexedDB from './plugins/IndexedDB';
import LocalStorage from './plugins/LocalStorage';
import App from './App.vue';
import './style.css';

const app = createApp(App);

app.use(IndexedDB).use(LocalStorage);
app.mount('#app');
