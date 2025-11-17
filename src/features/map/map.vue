<template>
    <div class="map">
        <YandexMap
            v-if="hasApiKey"
            v-model="map"
            :settings="{ location: { center: [animatedX, animatedY], zoom: animatedZoom } }"
        >
            <YandexMapDefaultSchemeLayer />
            <YandexMapDefaultFeaturesLayer />
            <YandexMapMarker
                v-for="device in selectedDevices"
                :key="device.id"
                :settings="{ coordinates: [device.lon, device.lat] }"
            >
                <FeatureMapMarker :device />
            </YandexMapMarker>
        </YandexMap>

        <TransitionFade>
            <div v-if="selectedDevices.length === 0 && hasApiKey" class="map__overlay">
                <p>Нет выбранных устройств для отображения на карте</p>
            </div>
        </TransitionFade>

        <div v-if="!hasApiKey" class="map__overlay">
            <p>Не найден ключ VITE_YANDEX_MAPS_API_KEY в .env файле</p>
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed, ref, shallowRef } from 'vue';
import { TransitionFade } from '@morev/vue-transitions';
import type { LngLat, YMap } from '@yandex/ymaps3-types';
import {
    YandexMap,
    YandexMapDefaultSchemeLayer,
    YandexMapDefaultFeaturesLayer,
    YandexMapMarker,
    getLocationFromBounds,
} from 'vue-yandex-maps';
import { useEntitiesStore } from '@/stores/entities';
import { useSettingsStore } from '@/stores/settings';
import FeatureMapMarker from './marker.vue';
import type { Device } from '@/shared/api/types';
import { TransitionPresets, useTransition, watchDebounced } from '@vueuse/core';

const map = shallowRef<YMap>();
const entitiesStore = useEntitiesStore();
const settingsStore = useSettingsStore();

const selectedDevices = computed(() => {
    const deviceIds =
        settingsStore.mode === 'online'
            ? Array.from(settingsStore.selectedOnlineDeviceIds.values())
            : settingsStore.selectedArchiveDeviceId
              ? [settingsStore.selectedArchiveDeviceId]
              : [];
    return deviceIds.map((id) => entitiesStore.devices.get(id)).filter(Boolean) as Device[];
});

const hasApiKey = computed(() => Boolean(import.meta.env.VITE_YANDEX_MAPS_API_KEY));

const minLon = computed(() => Math.min(...selectedDevices.value.map((device) => device.lon)));
const maxLon = computed(() => Math.max(...selectedDevices.value.map((device) => device.lon)));
const minLat = computed(() => Math.min(...selectedDevices.value.map((device) => device.lat)));
const maxLat = computed(() => Math.max(...selectedDevices.value.map((device) => device.lat)));

const locationToFit = ref({
    center: [0, 0] as LngLat,
    zoom: 10,
});
const animatedX = useTransition(() => locationToFit.value.center[0], {
    duration: 400,
    easing: TransitionPresets.easeInOutCubic,
});
const animatedY = useTransition(() => locationToFit.value.center[1], {
    duration: 400,
    easing: TransitionPresets.easeInOutCubic,
});
const animatedZoom = useTransition(() => locationToFit.value.zoom, {
    duration: 400,
    easing: TransitionPresets.easeInOutCubic,
});

watchDebounced(
    [minLon, maxLon, minLat, maxLat],
    async () => {
        if (!map.value) return;
        if (selectedDevices.value.length === 0) return;

        locationToFit.value = await getLocationFromBounds({
            bounds: [
                [minLon.value, minLat.value],
                [maxLon.value, maxLat.value],
            ],
            map: map.value,
            roundZoom: false,
        });
        locationToFit.value.zoom *= 0.9;
    },
    { debounce: 500, immediate: true },
);
</script>

<style scoped>
.map {
    position: relative;
}

.map__overlay {
    position: absolute;
    padding: 32px;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: #0008;
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--color-base);
    font-size: 1.5em;
    font-weight: bold;
    backdrop-filter: blur(10px);
}

.map__overlay p {
    text-align: center;
}

:deep(.__ymap-marker_wrapper) {
    pointer-events: none;
}
</style>
