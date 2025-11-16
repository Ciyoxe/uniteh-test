<template>
    <UiPopover>
        <template #trigger>
            <UiButton>
                <IconDots />
            </UiButton>
        </template>
        <template #content>
            <div class="device-card-actions__buttons">
                <FeatureDeviceEditingButton :device="device" />
                <FeatureDeviceDeletionButton :device-id="device.id" />
            </div>
        </template>
    </UiPopover>
</template>

<script setup lang="ts">
import UiPopover from '@/shared/ui/popover.vue';
import UiButton from '@/shared/ui/button.vue';
import IconDots from '@/shared/icons/dots.vue';
import FeatureDeviceEditingButton from '@/features/device-editing/button.vue';
import FeatureDeviceDeletionButton from '@/features/device-deletion/button.vue';
import type { Device } from '@/shared/api/types';

defineProps<{
    device: Device;
}>();
</script>

<style scoped>
.device-card-actions__buttons {
    margin: 16px;
    padding: 16px;
    background-color: var(--color-base);
    border-radius: 12px;
    box-shadow: 0 0 16px 0 rgba(18, 27, 82, 0.233);
    display: flex;
    flex-direction: column;
    gap: 8px;
}
</style>
