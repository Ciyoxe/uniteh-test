<template>
    <h1>You did it!</h1>
    <WidgetControls />
</template>

import './styles/index.css';

<script setup lang="ts">
import { useWebsocketEventsStream } from '../shared/api/websocket-mock';
import { useEntitiesStore } from '../stores/entities';
import WidgetControls from '../widgets/controls.vue';
import '@/app/index.css';

const entitiesStore = useEntitiesStore();
useWebsocketEventsStream((event) => {
    switch (event.type) {
        case 'device_update':
            entitiesStore.devices.set(event.device.id, event.device);
            break;
        case 'group_update':
            entitiesStore.groups.set(event.group.id, event.group);
            break;
    }
});
</script>
