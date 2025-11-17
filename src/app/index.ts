import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';
import { createYmaps } from 'vue-yandex-maps';
import { createPinia } from 'pinia';
import { createApp } from 'vue';
import App from './index.vue';

const app = createApp(App);

try {
    app.use(
        createYmaps({
            apikey: import.meta.env.VITE_YANDEX_MAPS_API_KEY,
        }),
    );
} catch {
    // we will handle error visually in FeatureMap component
}

app.use(createPinia().use(piniaPluginPersistedstate)).mount('#app');
