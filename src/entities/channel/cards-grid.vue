<template>
    <ol class="channels-grid">
        <li v-for="i in device.channels" :key="i">
            <EntityChannelCard :device-id="device.id" :channel-index="i" />
        </li>
    </ol>
</template>

<script setup lang="ts">
import type { Device } from '@/shared/api/types';
import EntityChannelCard from './card.vue';

defineProps<{
    device: Device;
}>();
</script>

<style scoped>
.channels-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 8px;
    margin-inline: 16px;
    list-style: none;
    padding: 16px;
    background-color: var(--color-base);
    border-radius: 0 0 12px 12px;
    border: 1px solid color-mix(in srgb, var(--color-base), black 20%);
    border-top: none;
}

@media (width <= 1600px) {
    .channels-grid {
        grid-template-columns: repeat(3, 1fr);
    }
}

@media (width <= 768px) {
    .channels-grid {
        grid-template-columns: repeat(2, 1fr);
    }
}
</style>
