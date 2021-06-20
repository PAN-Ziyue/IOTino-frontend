import request from '@/utils/request';
import type { DeviceParam } from '@/models/device';

export async function queryDevice(params?: DeviceParam) {
  return request('/api/devices', {
    ...params,
  });
}

export async function removeRule(params?: DeviceParam) {
  return request('/api/devices', {
    method: 'DELETE',
    data: {
      ...params,
    },
  });
}

export async function addDevice(params: DeviceParam) {
  return request('/api/devices', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

export async function updateRule(params: DeviceParam) {
  return request('/api/devices', {
    method: 'PUT',
    data: {
      ...params,
    },
  });
}
