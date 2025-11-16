import type { Device, DevicesGroup } from '@/shared/api/types';
import { defineStore } from 'pinia';
import { ref } from 'vue';

const deviceMatchesQuery = (device?: Device, query?: string): device is Device => {
    if (!device) {
        return false;
    }
    if (!query) {
        return true;
    }
    return (
        device.name.toUpperCase().includes(query.toUpperCase()) ||
        device.id.toString().includes(query)
    );
};

export const useEntitiesStore = defineStore('entities', () => {
    // id -> entity
    const searchQuery = ref<string>();
    const devices = ref(new Map<number, Device>());
    const groups = ref(new Map<string, DevicesGroup>());

    const deleteDevice = (id: number) => {
        devices.value.delete(id);
        groups.value.forEach((group) => {
            group.deviceIds = group.deviceIds.filter((deviceId) => deviceId !== id);
        });
    };
    const getDevicesInGroup = (groupId: string | null) => {
        // Non-grouped devices
        if (groupId === null) {
            const deviceIdsUsedInGroups = new Set(
                Array.from(groups.value.values()).flatMap((group) => group.deviceIds),
            );
            return Array.from(devices.value.keys())
                .filter((id) => !deviceIdsUsedInGroups.has(id))
                .map((id) => devices.value.get(id)!)
                .filter((d) => deviceMatchesQuery(d, searchQuery.value));
        }

        const group = groups.value.get(groupId);
        if (!group) {
            return [];
        }
        return group.deviceIds
            .map((id) => devices.value.get(id))
            .filter((d) => deviceMatchesQuery(d, searchQuery.value));
    };
    const getGroupsList = () => {
        return Array.from(groups.value.keys())
            .filter((groupId) => getDevicesInGroup(groupId).length > 0)
            .map((groupId) => groups.value.get(groupId)!);
    };

    return {
        searchQuery,
        devices,
        groups,
        deleteDevice,
        getGroupsList,
        getDevicesInGroup,
    };
});
