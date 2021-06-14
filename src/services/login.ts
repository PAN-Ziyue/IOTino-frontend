import request from '@/utils/request';

export type LoginParamsType = {
  email: string;
  password: string;
};

export async function fakeAccountLogin(params: LoginParamsType) {
  return request('/api/login', {
    method: 'POST',
    data: params,
  });
}