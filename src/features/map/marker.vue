<template>
    <UiPopover class="map-marker">
        <template #trigger>
            <IconLocation :class="['map-marker__icon', { alarmed }]" />
        </template>
        <template #content>
            <div class="map-marker__content">
                <p class="map-marker__name"><strong>Название:</strong> {{ device.name }}</p>
                <p class="map-marker__id"><strong>ID:</strong> {{ device.id }}</p>
                <p class="map-marker__channels">
                    <strong>Количество каналов:</strong> {{ device.channels }}
                </p>
                <p class="map-marker__time">
                    <strong>Время:</strong> {{ formatDatetime(device.timestamp) }}
                </p>
                <p class="map-marker__coordinates">
                    <strong>Координаты:</strong> {{ device.lat }}, {{ device.lon }}
                </p>
            </div>
        </template>
    </UiPopover>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { formatDatetime } from '@/shared/lib/utils';
import type { Device } from '@/shared/api/types';
import { useSettingsStore } from '@/stores/settings';
import IconLocation from '@/shared/icons/location.vue';
import UiPopover from '@/shared/ui/popover.vue';

const { device } = defineProps<{
    device: Device;
}>();

const settingsStore = useSettingsStore();

const alarmed = computed(() => {
    if (settingsStore.mode === 'online') {
        return device.alarm;
    }
    return false;
});
</script>

<style scoped>
.map-marker {
    pointer-events: auto;
    transform: translate(-50%, -80%);
}

.map-marker__icon {
    color: var(--color-neutral);
    width: 64px;
    height: 64px;
}

.map-marker__icon.alarmed {
    color: var(--color-danger);
}

.map-marker__content {
    padding: 16px;
    margin: 16px;
    background-color: var(--color-base);
    box-shadow: 0 0 16px 0 #121b524f;
    border-radius: 12px;
    font-size: 1em;
}
</style>
