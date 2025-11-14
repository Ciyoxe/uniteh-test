import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';
import { createYmaps } from 'vue-yandex-maps';
import { createPinia } from 'pinia';
import { createApp } from 'vue';
import App from './App.vue';

createApp(App)
    .use(createPinia().use(piniaPluginPersistedstate))
    .use(
        createYmaps({
            apikey: import.meta.env.VITE_YANDEX_MAPS_API_KEY,
        }),
    )
    .mount('#app');
