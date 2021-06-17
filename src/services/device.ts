import request from '@/utils/request';
import type { DeviceParams } from '@/models/device';

export async function queryDevice(params?: DeviceParams) {
  return request('/api/devices', {
    ...params,
  });
}

export async function removeRule(params: { key: number[] }) {
  return request('/api/device', {
    method: 'DELETE',
    data: {
      ...params,
    },
  });
}

export async function addRule(params: DeviceParams) {
  return request('/api/device', {
    method: 'POST',
    data: {
      ...params,
      method: 'post',
    },
  });
}

export async function updateRule(params: DeviceParams) {
  return request('/api/device', {
    method: 'PUT',
    data: {
      ...params,
    },
  });
}
