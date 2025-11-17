<template>
    <FeatureMap class="map" />
</template>

<script setup lang="ts">
import FeatureMap from '@/features/map/map.vue';
</script>

<style scoped>
.map {
    flex: 1 1 100%;
    margin: 16px;
    border-radius: 12px;
    min-width: 0;
    min-height: 0;
    overflow: hidden;
    height: calc(100dvh - 32px);
}
</style>
