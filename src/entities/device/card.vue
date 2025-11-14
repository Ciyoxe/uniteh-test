<template>
    <div class="device-card">
        <p class="device-card__name">{{ device.name }}</p>
        <p class="device-card__timestamp">{{ device.timestamp }}</p>
        <p class="device-card__wifi">{{ device.wifi }}</p>
        <p class="device-card__alarm">{{ device.alarm }}</p>
        <p class="device-card__lat">{{ device.lat }}</p>
        <p class="device-card__lon">{{ device.lon }}</p>
        <p class="device-card__channels">{{ device.channels }}</p>
    </div>
</template>

<script setup lang="ts">
import type { Device } from '@/shared/api/types';

defineProps<{
    device: Device;
}>();
</script>
