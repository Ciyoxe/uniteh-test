<template>
    <h1>You did it!</h1>
    <WidgetControls />
</template>

import './styles/index.css';

<script setup lang="ts">
import { fetchEntities } from '@/features/data-fetching/fetch-entities';
import WidgetControls from '../widgets/controls.vue';
import '@/app/index.css';

fetchEntities();
</script>
