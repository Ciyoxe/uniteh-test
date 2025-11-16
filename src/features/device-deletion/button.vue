<template>
    <UiButton type="warn" @click="modalOpen = true">
        Удалить
        <IconDelete />

        <Teleport to="body">
            <UiDialog v-model="modalOpen">
                <p>Вы уверены, что хотите удалить устройство {{ deviceId }}?</p>
                <div class="device-deletion-button__buttons">
                    <UiButton type="primary" @click="modalOpen = false">Отмена</UiButton>
                    <UiButton type="warn" @click="confirmDeletion">Удалить</UiButton>
                </div>
            </UiDialog>
        </Teleport>
    </UiButton>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import IconDelete from '@/shared/icons/delete.vue';
import UiButton from '@/shared/ui/button.vue';
import UiDialog from '@/shared/ui/dialog.vue';
import { useEntitiesStore } from '@/stores/entities';
import { useSettingsStore } from '@/stores/settings';

const { deviceId } = defineProps<{
    deviceId: number;
}>();

const entitiesStore = useEntitiesStore();
const settingsStore = useSettingsStore();

const modalOpen = ref(false);

const confirmDeletion = () => {
    entitiesStore.deleteDevice(deviceId);
    settingsStore.deleteDevice(deviceId);
    modalOpen.value = false;
};
</script>

<style scoped>
.device-deletion-button__buttons {
    display: flex;
    gap: 16px;
}

.device-deletion-button__buttons button {
    flex: 1;
}
</style>
