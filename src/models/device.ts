export interface DeviceItem {
  device: string;
  name: string;
  status: string;
  count: number;
  value: number;
  trace: DeviceLocation[];
}


export interface DeviceLocation {
  latitude: number;
  longitude: number;
  time: number;
}


export interface DeviceParam {
  device?: string;
  status?: string;
  name?: string;
  count?: number;
  value?: number;

  pageSize?: number;
  currentPage?: number;
  filter?: Record<string, any[]>;
  sorter?: Record<string, any>;
}
