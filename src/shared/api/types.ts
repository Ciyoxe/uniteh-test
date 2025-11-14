export type Device = {
    id: number;
    name: string;
    timestamp: string;
    wifi: number;
    alarm: boolean;
    lat: number;
    lon: number;
    channels: number;
};

export type DevicesGroup = {
    id: string;
    name: string;
    deviceIds: number[];
};
