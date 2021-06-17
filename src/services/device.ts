import request from '@/utils/request';
import type { DeviceParams } from '@/models/device';

export async function queryDevice(params?: DeviceParams) {
  return request('/api/devices', {
    ...params,
  });
}

export async function removeRule(params?: DeviceParams) {
  return request('/api/devices', {
    method: 'DELETE',
    data: {
      ...params,
    },
  });
}

export async function addDevice(params: DeviceParams) {
  return request('/api/devices', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

export async function updateRule(params: DeviceParams) {
  return request('/api/devices', {
    method: 'PUT',
    data: {
      ...params,
    },
  });
}
