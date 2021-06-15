import request from '@/utils/request';

export async function dashboardData() {
  return request('/api/dashboard');
}
