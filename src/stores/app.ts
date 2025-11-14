import { defineStore } from 'pinia';

export const useAppStore = defineStore('app', () => {}, {
    persist: {
        storage: localStorage,
    },
});
