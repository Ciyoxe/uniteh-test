<template>
    <div class="device-card" :for="`device-card-${device.id}`">
        <label class="device-card__label">
            <div class="device-card__header">
                <UiCheckbox
                    :id="`device-card-${device.id}`"
                    :checked="selected"
                    :disabled
                    @change="settingsStore.toggleDeviceSelected(device.id)"
                />
                <p class="device-card__id">ID: {{ device.id }}</p>
                <p class="device-card__name">{{ device.name }}</p>
            </div>
            <div v-if="settingsStore.mode === 'online'" class="device-card__online">
                <IconCar />
                <IconSignal :strength="device.wifi" />
                <p class="device-card__time">{{ timeFormatted }}</p>
            </div>
            <div class="device-card__footer">
                <IconAlert :class="['device-card__alert', { shown: isAlarmShown }]" />
                <EntityDeviceCardActions class="device-card__actions" :device />

                <UiButton @click="settingsStore.toggleDeviceExpanded(groupId, device.id)">
                    <IconChevron :direction="expanded ? 'up' : 'down'" />
                </UiButton>
            </div>
        </label>
        <TransitionExpand>
            <EntityChannelCardsGrid v-if="expanded" :device />
        </TransitionExpand>
    </div>
</template>
>

<script setup lang="ts">
import { TransitionExpand } from '@morev/vue-transitions';
import { computed } from 'vue';
import { useSettingsStore } from '@/stores/settings';
import type { Device } from '@/shared/api/types';
import IconChevron from '@/shared/icons/chevron.vue';
import IconCar from '@/shared/icons/car.vue';
import IconSignal from '@/shared/icons/signal.vue';
import IconAlert from '@/shared/icons/alert.vue';
import UiCheckbox from '@/shared/ui/checkbox.vue';
import UiButton from '@/shared/ui/button.vue';
import EntityDeviceCardActions from './card-actions.vue';
import EntityChannelCardsGrid from '../channel/cards-grid.vue';
import { formatDatetime } from '@/shared/lib/utils';

const { device, groupId = null } = defineProps<{
    groupId?: string | null;
    device: Device;
}>();

const settingsStore = useSettingsStore();

const isAlarmShown = computed(() => device.alarm && settingsStore.mode === 'online');
const timeFormatted = computed(() => formatDatetime(device.timestamp));
const expanded = computed(() => settingsStore.isDeviceExpanded(groupId, device.id));
const selected = computed(() => settingsStore.isDeviceSelected(device.id));

// Block all checkboxes except selected one in archive mode
const disabled = computed(
    () =>
        settingsStore.mode === 'archive' &&
        settingsStore.selectedArchiveDeviceId !== null &&
        !selected.value,
);
</script>

<style scoped>
.device-card__label {
    display: flex;
    flex-direction: column;
    gap: 16px;
    border-radius: 16px;
    padding: 16px;
    cursor: pointer;
    background-color: var(--color-base);
    border: 1px solid color-mix(in srgb, var(--color-base), black 20%);
}

.device-card__header,
.device-card__online,
.device-card__footer {
    display: flex;
    align-items: center;
    gap: 16px;
}

.device-card__footer {
    gap: 8px;
}

.device-card__actions {
    margin-left: auto;
}

.device-card__name {
    font-size: 1.2em;
    overflow-wrap: anywhere;
    text-wrap: balance;
}

.device-card__name,
.device-card__time {
    flex: 1;
    text-align: right;
}

.device-card__alert {
    color: #ff6060;
    opacity: 0;
    width: 32px;
    height: 32px;
    animation: alert 1s ease infinite;
    transition: opacity 0.3s ease;
}
.device-card__alert.shown {
    opacity: 1;
}

@keyframes alert {
    0% {
        transform: scale(1);
    }
    50% {
        transform: scale(1.2);
    }
    100% {
        transform: scale(1);
    }
}
</style>
