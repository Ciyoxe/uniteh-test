import type { Device, DevicesGroup } from '@/shared/api/types';
import { defineStore } from 'pinia';
import { computed, reactive } from 'vue';

export const useEntitiesStore = defineStore('entities', () => {
    // State as maps id -> entity
    const devices = reactive<Map<number, Device>>(new Map());
    const groups = reactive<Map<string, DevicesGroup>>(new Map());

    const devicesList = computed(() => Array.from(devices.values()));
    const groupsList = computed(() => Array.from(groups.values()));

    const groupsWithDevices = computed(() =>
        groupsList.value.map((group) => {
            return {
                id: group.id,
                name: group.name,
                devices: group.deviceIds.map((id) => getDeviceById(id)).filter(Boolean) as Device[],
            };
        }),
    );

    const getDeviceById = (id: number) => devices.get(id);
    const getGroupById = (id: string) => groups.get(id);

    const updateDevice = (device: Device) => {
        devices.set(device.id, device);
    };
    const updateGroup = (group: DevicesGroup) => {
        groups.set(group.id, group);
    };

    return {
        devicesList,
        groupsList,
        groupsWithDevices,
        updateDevice,
        updateGroup,
        getDeviceById,
        getGroupById,
    };
});
