<template>
    <UiInput v-model="searchQuery" type="text" placeholder="Поиск (название или ID)">
        <template #leading>
            <IconSearch />
        </template>
    </UiInput>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import { watchDebounced } from '@vueuse/core';
import { useEntitiesStore } from '@/stores/entities';
import IconSearch from '@/shared/icons/search.vue';
import UiInput from '@/shared/ui/input.vue';

const entitiesStore = useEntitiesStore();
const searchQuery = ref('');

watchDebounced(
    searchQuery,
    (query) => {
        entitiesStore.searchQuery = query;
    },
    { debounce: 500 },
);

watch(
    () => entitiesStore.searchQuery,
    (query) => {
        searchQuery.value = query ?? '';
    },
    { immediate: true },
);
</script>
