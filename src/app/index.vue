<template>
    <main>
        <WidgetControls class="sidebar" />
        <FeatureMap class="map" />
    </main>
</template>

import './styles/index.css';

<script setup lang="ts">
import { fetchEntities } from '@/features/data-fetching/fetch-entities';
import WidgetControls from '../widgets/controls.vue';
import FeatureMap from '@/features/map/map.vue';
import '@/app/index.css';

fetchEntities();
</script>

<style scoped>
main {
    display: flex;
    gap: 16px;
}

.sidebar {
    flex: 0 0;
    min-width: clamp(500px, 40vw, 700px);
}

.map {
    flex: 1 1 100%;
    margin: 16px;
    border-radius: 12px;
    overflow: hidden;
}

@media (width <= 1024px) {
    .sidebar {
        min-width: 100vw;
        padding-top: 64px;
    }
}
</style>
