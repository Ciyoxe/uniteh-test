import type { Device, DevicesGroup } from '@/shared/api/types';
import { defineStore } from 'pinia';
import { computed, reactive } from 'vue';

export const useEntitiesStore = defineStore('entities', () => {
    // id -> entity
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
    const devicesWithoutGroups = computed(() => {
        const deviceIds = new Set(groupsList.value.flatMap((group) => group.deviceIds));
        return devicesList.value.filter((device) => !deviceIds.has(device.id));
    });

    const getDeviceById = (id: number) => devices.get(id);
    const getGroupById = (id: string) => groups.get(id);

    const updateGroup = (group: DevicesGroup) => {
        groups.set(group.id, group);
    };
    const updateDevice = (device: Device) => {
        devices.set(device.id, device);
    };
    const deleteDevice = (id: number) => {
        devices.delete(id);
        groups.forEach((group) => {
            group.deviceIds = group.deviceIds.filter((deviceId) => deviceId !== id);
        });
    };

    return {
        devicesList,
        groupsList,
        groupsWithDevices,
        devicesWithoutGroups,

        updateGroup,
        updateDevice,
        deleteDevice,
        getDeviceById,
        getGroupById,
    };
});
