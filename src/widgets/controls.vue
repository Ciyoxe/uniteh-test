<template>
    <aside class="controls">
        <div class="controls__tabs">
            <UiButton
                :type="settingsStore.mode === 'online' ? 'accent' : 'primary'"
                @click="settingsStore.mode = 'online'"
            >
                Онлайн
            </UiButton>
            <UiButton
                :type="settingsStore.mode === 'archive' ? 'accent' : 'primary'"
                @click="settingsStore.mode = 'archive'"
            >
                Архив
            </UiButton>
        </div>
        <FeatureSearchBar />
        <div class="controls__scrollable">
            <EntityGroupCardsList :groups="entitiesStore.getGroupsList()" />
            <EntityDeviceCardsList :devices="entitiesStore.getDevicesInGroup(null)" />
        </div>
    </aside>
</template>

<script setup lang="ts">
import UiButton from '@/shared/ui/button.vue';
import { useSettingsStore } from '@/stores/settings';
import { useEntitiesStore } from '@/stores/entities';
import EntityGroupCardsList from '@/entities/group/cards-list.vue';
import EntityDeviceCardsList from '@/entities/device/cards-list.vue';
import FeatureSearchBar from '@/features/search/bar.vue';

const settingsStore = useSettingsStore();
const entitiesStore = useEntitiesStore();
</script>

<style scoped>
.controls {
    background-color: var(--color-background);
    display: flex;
    flex-direction: column;
    gap: 16px;
    padding: 8px;
    height: 100dvh;
}

.controls__tabs {
    display: flex;
    gap: 16px;
}

.controls__tabs button {
    flex: 1;
    max-height: 100%;
}

.controls__scrollable {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 16px;
    overflow-y: scroll;
}
</style>
