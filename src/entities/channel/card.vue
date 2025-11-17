<template>
    <button :class="['channel-card', { selected }]" :disabled @click="toggleSelected">
        <p class="channel-card__name">Камера {{ channelIndex }}</p>
    </button>
</template>

<script setup lang="ts">
import { useSettingsStore } from '@/stores/settings';
import { computed } from 'vue';

const settingsStore = useSettingsStore();

const { deviceId, channelIndex } = defineProps<{
    deviceId: number;
    channelIndex: number;
}>();

const disabled = computed(() => !settingsStore.isDeviceSelected(deviceId));
const selected = computed(() => settingsStore.isChannelSelected(deviceId, channelIndex));

const toggleSelected = () => {
    if (disabled.value) return;

    settingsStore.toggleChannelSelected(deviceId, channelIndex);
};
</script>

<style scoped>
.channel-card {
    font-size: 1em;
    cursor: pointer;
    border: 1px solid color-mix(in srgb, var(--color-base), black 20%);
    padding: 16px;
    background-color: var(--color-base);
    border-radius: 12px;
    aspect-ratio: 16 / 9;
    width: 100%;
}

.channel-card.selected {
    background-color: var(--color-accent);
}
</style>
