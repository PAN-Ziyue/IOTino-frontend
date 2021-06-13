import request from '@/utils/request';

export interface UserRegisterParams {
  account: string;
  email: string;
  password: string;
}

export async function fakeRegister(params: UserRegisterParams) {
  return request('/api/register', {
    method: 'POST',
    data: params,
  });
}
