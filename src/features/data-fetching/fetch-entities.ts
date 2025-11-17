import { useWebsocketEventsStream } from '@/shared/api/websocket-mock';
import { useEntitiesStore } from '@/stores/entities';

export const fetchEntities = () => {
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
};
