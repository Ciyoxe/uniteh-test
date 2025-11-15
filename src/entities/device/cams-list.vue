<template>
    <ol class="cams-list">
        <li
            v-for="i in device.channels"
            :key="i"
            :class="[
                'cams-list__item',
                {
                    enabled:
                        appStore.isCameraEnabled(device.id, i) &&
                        appStore.isDeviceEnabled(device.id),
                },
            ]"
            @click="appStore.toggleCameraEnabled(device.id, i)"
        >
            Камера {{ i }}
        </li>
    </ol>
</template>

<script setup lang="ts">
import type { Device } from '@/shared/api/types';
import { useAppStore } from '@/stores/app';

defineProps<{
    device: Device;
}>();

const appStore = useAppStore();
</script>

<style scoped>
.cams-list {
    margin-inline: 16px;
    list-style: none;
    padding: 16px;
    background-color: var(--color-base);
    border-radius: 0 0 12px 12px;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 8px;
}

.cams-list__item {
    padding: 16px;
    aspect-ratio: 16 / 9;
    background-color: var(--color-primary);
    border-radius: 12px;
    transition: background-color 0.3s ease-in-out;
}

.cams-list__item.enabled {
    background-color: var(--color-accent);
}

@media (width <= 1024px) {
    .cams-list {
        grid-template-columns: repeat(3, 1fr);
    }
}

@media (width <= 768px) {
    .cams-list {
        grid-template-columns: repeat(2, 1fr);
    }
}
</style>
