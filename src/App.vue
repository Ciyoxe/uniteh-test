<template>
    <h1>You did it!</h1>
    <UiPopover>
        <template #trigger>
            <UiButton @click="strength++">
                Click me {{ strength }}
                <IconSignal :strength />
            </UiButton>
        </template>
        <template #content>
            <p class="popover__content-text">Hello</p>
        </template>
    </UiPopover>
    <UiCheckbox v-model="checked" />
    <p>
        {{ entitiesStore.devicesList }}
        {{ entitiesStore.groupsList }}
        {{ entitiesStore.groupsWithDevices }}
    </p>
</template>

<script setup lang="ts">
import { useWebsocketEventsStream } from './shared/api/websocket-mock';
import { useEntitiesStore } from './stores/entities';
import { ref } from 'vue';
import UiButton from './shared/ui/button.vue';
import IconSignal from './shared/icons/signal.vue';
import UiCheckbox from './shared/ui/checkbox.vue';
import UiPopover from './shared/ui/popover.vue';

const strength = ref(1);
const checked = ref(true);

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

<style>
#app {
    padding-block: 1000px;
}
.popover__content-text {
    color: red;
    background-color: blue;
    width: 300px;
    overflow: hidden;
    margin: 10px;
}
</style>
