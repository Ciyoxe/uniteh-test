import type { Device, DevicesGroup } from './types';
import { waitFor } from '@/shared/lib/utils';
import { SampleDevices, SampleGroups } from './data';

type WebsocketDeviceEvent = {
    type: 'device_update';
    device: Device;
};
type WebsocketGroupEvent = {
    type: 'group_update';
    group: DevicesGroup;
};

type WebsocketApiEvent = WebsocketDeviceEvent | WebsocketGroupEvent;

export const useWebsocketEventsStream = async (listener: (event: WebsocketApiEvent) => void) => {
    const delayMs = 200;

    // simulate websocket events for devices and groups
    for (const device of SampleDevices) {
        await waitFor(delayMs);
        listener({
            type: 'device_update',
            device,
        });
    }
    for (const group of SampleGroups) {
        await waitFor(delayMs);
        listener({
            type: 'group_update',
            group,
        });
    }
};
