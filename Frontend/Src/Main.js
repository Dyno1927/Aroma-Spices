import App from '@/App.vue';
import router from '@/Router/Index.js';
import { createHead } from '@vueuse/head';
import { createApp } from 'vue';
import './Style.css';

const app = createApp(App);
const head = createHead();

app.use(router);
app.use(head);

app.mount('#app');
