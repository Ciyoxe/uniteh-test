<template>
    <ol class="devices-list">
        <li v-for="device in devices" :key="device.id">
            <EntityDeviceCard :device />
        </li>
    </ol>
</template>

<script setup lang="ts">
import type { Device } from '@/shared/api/types';
import EntityDeviceCard from './card.vue';

defineProps<{
    devices: Device[];
}>();
</script>

<style scoped>
.devices-list {
    list-style: none;
    display: flex;
    flex-direction: column;
    gap: 16px;
}
</style>
