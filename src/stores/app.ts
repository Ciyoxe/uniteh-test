import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useAppStore = defineStore(
    'app',
    () => {
        const mode = ref<'online' | 'archive'>('online');

        return {
            mode,
        };
    },
    {
        persist: {
            storage: localStorage,
        },
    },
);
