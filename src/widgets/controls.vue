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
        <p v-if="groups.length === 0 && devices.length === 0" class="controls__empty">
            Нет устройств
        </p>
        <div v-else class="controls__scrollable">
            <EntityGroupCardsList :groups="groups" />
            <EntityDeviceCardsList :devices="devices" />
        </div>
    </aside>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useSettingsStore } from '@/stores/settings';
import { useEntitiesStore } from '@/stores/entities';
import UiButton from '@/shared/ui/button.vue';
import EntityGroupCardsList from '@/entities/group/cards-list.vue';
import EntityDeviceCardsList from '@/entities/device/cards-list.vue';
import FeatureSearchBar from '@/features/search/bar.vue';

const settingsStore = useSettingsStore();
const entitiesStore = useEntitiesStore();

const groups = computed(() => entitiesStore.getGroupsList());
const devices = computed(() => entitiesStore.getDevicesInGroup(null));
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

.controls__empty {
    text-align: center;
    font-size: 1.25em;
}
</style>
