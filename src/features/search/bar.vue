<template>
    <UiInput v-model="searchQuery" type="text" placeholder="Поиск (название или ID)">
        <template #leading>
            <IconSearch />
        </template>
    </UiInput>
</template>

<script setup lang="ts">
import IconSearch from '@/shared/icons/search.vue';
import UiInput from '@/shared/ui/input.vue';
import { useEntitiesStore } from '@/stores/entities';
import { watchDebounced } from '@vueuse/core';
import { ref } from 'vue';

const entitiesStore = useEntitiesStore();
const searchQuery = ref('');

watchDebounced(
    searchQuery,
    (query) => {
        entitiesStore.searchQuery = query;
    },
    { debounce: 500 },
);
</script>
