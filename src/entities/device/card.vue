<template>
    <div class="device-card" :for="`device-card-${device.id}`">
        <label class="device-card__label">
            <div class="device-card__header">
                <UiCheckbox
                    :id="`device-card-${device.id}`"
                    :checked="appStore.isDeviceEnabled(device.id)"
                    @change="appStore.toggleDeviceEnabled(device.id)"
                />
                <p class="device-card__name">{{ device.name }}</p>
            </div>
            <div v-if="appStore.mode === 'online'" class="device-card__online">
                <IconCar />
                <IconSignal :strength="device.wifi" />
                <p class="device-card__time">{{ timeFormatted }}</p>
            </div>
            <div class="device-card__footer">
                <IconAlert :class="['device-card__alert', { shown: isAlarmShown }]" />
                <DeviceCardActions class="device-card__actions" />

                <UiButton @click="appStore.toggleDeviceExpanded(device.id)">
                    <IconChevron
                        :direction="appStore.isDeviceExpanded(device.id) ? 'up' : 'down'"
                    />
                </UiButton>
            </div>
        </label>
        <TransitionExpand>
            <DeviceCamsList v-if="appStore.isDeviceExpanded(device.id)" :device />
        </TransitionExpand>
    </div>
</template>

<script setup lang="ts">
import { TransitionExpand } from '@morev/vue-transitions';
import { computed } from 'vue';
import type { Device } from '@/shared/api/types';
import { useAppStore } from '@/stores/app';
import IconChevron from '@/shared/icons/chevron.vue';
import IconCar from '@/shared/icons/car.vue';
import IconSignal from '@/shared/icons/signal.vue';
import IconAlert from '@/shared/icons/alert.vue';
import UiCheckbox from '@/shared/ui/checkbox.vue';
import UiButton from '@/shared/ui/button.vue';
import DeviceCardActions from './card-actions.vue';
import DeviceCamsList from './cams-list.vue';

const { device } = defineProps<{
    device: Device;
}>();

const appStore = useAppStore();

const isAlarmShown = computed(() => device.alarm && appStore.mode === 'online');
const timeFormatted = computed(() => {
    return new Date(device.timestamp).toLocaleString();
});
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
    font-size: 1em;
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
