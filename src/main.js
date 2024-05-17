import { createApp } from 'vue'
import App from './App.vue'
import IndexedDB from './plugins/IndexedDB'
import './style.css'

const app = createApp(App)

app.use(IndexedDB)
app.mount('#app')
