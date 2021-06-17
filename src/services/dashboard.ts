import request from '@/utils/request';

export async function getDashboardData() {
  return request('/api/dashboard');
}
