<template>
    <h1>You did it!</h1>
    <p>
        {{ entitiesStore.devicesList }}
        {{ entitiesStore.groupsList }}
        {{ entitiesStore.groupsWithDevices }}
    </p>
</template>

<script setup lang="ts">
import { useWebsocketEventsStream } from './shared/api/websocket-mock';
import { useEntitiesStore } from './stores/entities';

const entitiesStore = useEntitiesStore();
useWebsocketEventsStream((event) => {
    switch (event.type) {
        case 'device_update':
            entitiesStore.updateDevice(event.device);
            break;
        case 'group_update':
            entitiesStore.updateGroup(event.group);
            break;
    }
});
</script>

<style scoped></style>
