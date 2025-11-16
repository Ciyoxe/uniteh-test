<template>
    <ol class="groups-list">
        <li v-for="group in groups" :key="group.id">
            <EntityGroupCard :group />
        </li>
    </ol>
</template>

<script setup lang="ts">
import type { DevicesGroup } from '@/shared/api/types';
import EntityGroupCard from './card.vue';

defineProps<{
    groups: DevicesGroup[];
}>();
</script>

<style scoped>
.groups-list {
    list-style: none;
    display: flex;
    flex-direction: column;
    gap: 16px;
}
</style>
