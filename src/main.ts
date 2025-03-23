import { createApp } from 'vue';
import App from '@/App.vue';
import '@/style.css';

import { createPinia } from 'pinia';
import vuetify from '@/plugins/vuetify';
import router from '@/router/index';

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.use(vuetify);

app.mount('#app');
