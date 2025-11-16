<template>
    <div class="group">
        <div class="group__header" @click="settingsStore.toggleGroupExpanded(group.id)">
            <p class="group__name">{{ group.name }}</p>
            <IconChevron :direction="settingsStore.isGroupExpanded(group.id) ? 'up' : 'down'" />
        </div>
        <TransitionExpand>
            <EntityDeviceCardsList
                class="group__devices"
                v-if="settingsStore.isGroupExpanded(group.id)"
                :devices
            />
        </TransitionExpand>
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { TransitionExpand } from '@morev/vue-transitions';
import type { DevicesGroup } from '@/shared/api/types';
import { useSettingsStore } from '@/stores/settings';
import { useEntitiesStore } from '@/stores/entities';
import EntityDeviceCardsList from '@/entities/device/cards-list.vue';
import IconChevron from '@/shared/icons/chevron.vue';

const { group } = defineProps<{
    group: DevicesGroup;
}>();

const settingsStore = useSettingsStore();
const entitiesStore = useEntitiesStore();

const devices = computed(() => entitiesStore.getDevicesInGroup(group.id));
</script>

<style scoped>
.group {
    background-color: var(--color-base);
    border-radius: 12px;
    padding: 16px;
}

.group__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.group__header svg {
    width: 32px;
    height: 32px;
}

.group__name {
    font-size: 1.2em;
}

.group__devices {
    margin-top: 16px;
}
</style>
